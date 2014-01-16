(ns fleet-control.user
  (:require [clojure.data.json :as json]
            [fleet-control.utils :as utils]
            [com.freiheit.gae.datastore.datastore-access-dsl :as datastore]
            [com.freiheit.gae.datastore.datastore-query-dsl :as query]
            [com.freiheit.gae.datastore.datastore-types :as types]
            [com.freiheit.gae.datastore.keys :as ds-keys])
  (:import (com.google.appengine.api.datastore DatastoreServiceFactory DatastoreService Entity Key KeyFactory Query Query$FilterOperator)))

; ------------------- definition

(def 
  simple-user-format 
  {:name   :name 
   :email  :email 
	 :key    :key
   :insert :insert
   :admin  :admin})

(datastore/defentity user 
  [:key]
  [:name]
  [:email]
  [:admin :pre-save #(if (nil? %) false %)]
  [:password]
  [:insert :pre-save #(if (nil? %) (java.util.Date.) %)])

; ------------------- macro

; ------------------- save

(defn save [json request]
  "Interface for the execution of add user based on a http request."
  (utils/entity-output 
    (first 
      (datastore/store-or-update-entities! 
        [(merge
           (utils/load-or-create-entity user (get json :key) make-user) 
           (utils/create-pseudo-entity-map json '("email" "name" "password" "admin")))])) 
    simple-user-format))

; ------------------- user listing

(defn- authenticate [userlogin]
  (def entities 
    (query/select 
      (query/where 
        user 
        ([= :password (get userlogin :password)]
         [= :email (get userlogin :user)]))))
  (first entities))

(defn login [json request]
  "Interface for the login execution based on a http request."
  (let [user (authenticate (utils/create-pseudo-entity-map json ["user" "password'"]))]
    {
     :body (utils/entity-output user simple-user-format)
     :session { :user user }
     }))

(defn list-logged-user [json request]
  (let [user (-> request :session :user)]
	  {:body 
	   (utils/list-result 
	     (if-not (nil? user) 
	       [(utils/entity-output user simple-user-format)]) 
	       [] 
	     (if (nil? user) 0 1))}))

; ------------------- setup

(defn setup []
  (datastore/store-entities! 
    (list 
      (make-user 
        :key      "00000000-0000-0000-0001-000000000001" 
        :email    "francisco.spaeth@gmail.com"
        :admin    true
        :password "password"))))