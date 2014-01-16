(ns fleet-control.fleet
  (:require [clojure.data.json :as json]
            [fleet-control.utils :as utils]
            [com.freiheit.gae.datastore.datastore-access-dsl :as datastore]
            [com.freiheit.gae.datastore.datastore-query-dsl :as query]
            [com.freiheit.gae.datastore.datastore-types :as types]
            [com.freiheit.gae.datastore.keys :as ds-keys]))

; ------------------- definition

(def 
  simple-fleet-format 
  {:caption :caption 
   :active :active 
	 :key :key})

(datastore/defentity fleet 
  [:key]
  [:caption]
  [:active :pre-save #(if (nil? %) true %)])

; ------------------- functionalities

(defn list-records [json request]
  (let [
        result (map
 				         #(utils/entity-output % simple-pairing-format) 
	 			         (query/select (query/where fleet [])))
        ]
    (utils/list-result result (count result))))

(defn save [json request]
  "Interface for the execution of add fleet record."
  (utils/entity-output 
    (first 
      (datastore/store-or-update-entities! 
        [(merge 
           (utils/load-or-create-entity fleet (get json :key) make-fleet) 
           (utils/create-pseudo-entity-map json '("caption" "active")))])) 
    simple-fleet-format))