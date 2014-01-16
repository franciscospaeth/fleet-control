(ns fleet-control.control
  (:require [clojure.data.json :as json]
            [fleet-control.utils :as utils]
            [fleet-control.pairing :as pairing]
            [com.freiheit.gae.datastore.datastore-access-dsl :as datastore]
            [com.freiheit.gae.datastore.datastore-query-dsl :as query]
            [com.freiheit.gae.datastore.datastore-types :as types]
            [com.freiheit.gae.datastore.keys :as ds-keys]))

; ------------------- definition

(def 
  simple-control-format 
  {:key  :key
   :date :date 
   :lat  :lat 
	 :long :long})

(datastore/defentity control 
  [:key]
  [:date :pre-save #(java.util.Date.)]
  [:lat]
  [:long])

; ------------------- functionalities

;(defn setup []
;  "Inserts the setup record to the store."
;  (let [
;       parent-parent-parent-key (KeyFactory/createKey "User" "00000000-0000-0000-0001-000000000001")
;       parent-parent-key (KeyFactory/createKey parent-parent-parent-key "Account" "00000000-0000-0000-0000-000000000001")
;       parent-key (KeyFactory/createKey parent-parent-key "Pairing" "00000000-0000-0000-0003-000000000001")
;       entity (Entity. "Control" "00000000-0000-0000-0004-000000000001" parent-key)
;     ]
;  (do 
;    ; -27.2352312 -49.6500596
;    (. entity setProperty "date" (java.util.Date.))
;    (. entity setProperty "lat" "-27.2352312")
;    (. entity setProperty "long" "-49.6500596s")
;    (. datastoreService put entity))))

(defn save [json request]
  "Interface for the execution of add user based on a http request."
  (let [result (utils/entity-output 
                 (first 
 						       (datastore/store-or-update-entities! 
	 					         [(merge 
						            (utils/load-or-create-entity control (get json :key) make-control) 
						            (utils/create-pseudo-entity-map control '("lat" "long" "key")))])) 
                 simple-control-format)]
    (pairing/update-all-from-user (get result :user) (get result :key))))