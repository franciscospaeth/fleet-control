(ns fleet-control.pairing
  (:require [clojure.data.json :as json]
            [fleet-control.utils :as utils]
            [com.freiheit.gae.datastore.datastore-access-dsl :as datastore]
            [com.freiheit.gae.datastore.datastore-query-dsl :as query]
            [com.freiheit.gae.datastore.datastore-types :as types])
  (:import (com.google.appengine.api.datastore DatastoreServiceFactory DatastoreService Entity Key KeyFactory Query Query$FilterOperator)))

; ------------------- definition

(def 
  simple-pairing-format 
  {:key      :key
   :request  :request
   :pairing  :pairing
   :release  :release
   :lastping :lastping
   :fleet    :fleet
   :user     :user})

(datastore/defentity pairing 
  [:key]
  [:request :pre-save #(if (nil? %) (java.util.Date.) %)]
  [:pairing]
  [:release]
  [:lastping]
  [:fleet]
  [:user])

(def queries-pairing 
  {
   :pared-not-pared [[= :release nil]]
   :not-pared [[= :pairing nil]]
   :pared [[not= :pairing nil] 
            [= :release nil]]
   :released [[not= :release nil]]
   })

; ------------------ functionalities

(defn list-records [json request]
  (let [
        filter-conditions (get queries-pairing (keyword (get json :filterName)))
        selectedQuery (if 
                        (nil? filter-conditions)
                        (get queries-pairing :pared-not-pared)
                        filter-conditions)
        result (map
 				         #(utils/entity-output % simple-pairing-format) 
	 			         (query/select (query/where pairing [[= :release nil]])))
        ]
    (utils/list-result result (count result))))

(defn release [request]
  "Releases a specific pairing."
  (not 
    (empty 
      (datastore/store-entities! 
        [(merge 
           (first (query/select (query/where pairing ([= :key (types/to-key (-> request :params :key))])))) 
           { :release (java.util.Date.) })]))))

(defn pair [request]
  "Accepts the pairing request."
  (not 
    (empty 
      (datastore/store-entities! 
        [(merge 
           (first (query/select (query/where pairing ([= :key (types/to-key (-> request :params :key))])))) 
           { :pairing (java.util.Date.) })]))))

(defn save [json request]
  "Interface for the execution of add user based on a http request."
  (utils/entity-output 
    (first 
      (datastore/store-or-update-entities! 
        [(merge 
           (utils/load-or-create-entity pairing (get json :key) make-pairing) 
           (utils/create-pseudo-entity-map json '("")))])) 
    simple-pairing-format))

(defn update-all-from-user [user-key control-key]
  (not
    (empty
      (datastore/store-entities!
        (map 
          #(assoc % :lastping control-key)
          (query/select 
            (query/where pairing [[= :user user-key]])))))))