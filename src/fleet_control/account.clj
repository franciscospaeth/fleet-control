(ns fleet-control.account
  (:import (com.google.appengine.api.datastore DatastoreServiceFactory DatastoreService Entity Key KeyFactory)))

(def datastoreService (DatastoreServiceFactory/getDatastoreService))

(defn setup []
  "Inserts the setup record to the store."
  (let [
       parent-key (KeyFactory/createKey "User" "00000000-0000-0000-0001-000000000001")
       entity (Entity. "Account" "00000000-0000-0000-0000-000000000001" parent-key)
     ]
  (do 
    (. entity setProperty "synch_key" "00000000-0000-0000-0000-000000000002")
    (. datastoreService put entity))))

(defn- save-internal [account]
  {})