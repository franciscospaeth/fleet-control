(ns fleet-control.utils
  (:require [clojure.data.json :as json]
            [com.freiheit.gae.datastore.datastore-access-dsl :as datastore]
            [com.freiheit.gae.datastore.datastore-query-dsl :as query]
            [com.freiheit.gae.datastore.datastore-types :as types])
  (:import 
    [com.google.apphosting.api ApiProxy ApiProxy$Environment]
    [java.io File]
    [java.util HashMap]
    [java.io PrintWriter]
    [com.google.appengine.tools.development ApiProxyLocalFactory ApiProxyLocalImpl LocalServiceContext LocalServerEnvironment]
    [com.google.appengine.api.datastore DatastoreServiceFactory DatastoreService Entity Key KeyFactory Query Query$FilterOperator]
    [com.google.appengine.api.taskqueue.dev LocalTaskQueue]
    [com.google.appengine.tools.development.testing LocalDatastoreServiceTestConfig LocalServiceTestHelper]))

; ------------------- wrappers

(defn json-wrapper [handler]
  "Transform request body to json, invokes function and transform result to json again. 
   When response presents a key for :body just overwrite it with its value in json notation."
  (fn [request]
    (let 
      [content (slurp (-> request :body))
        json-content (if-not (empty? content) (json/read-str content))
        result (handler json-content request)]
      (if 
        (contains? result :body) 
        (assoc result :body (json/json-str (get result :body))) 
        (json/json-str result)))))

; ------------------- end wrappers

(defn entity-output [entity fields-mapping]
  (println entity)
  (if 
    (nil? entity) 
    nil
    (apply merge (map (fn [x1 x2]  {x1 (if (fn? x2) (x2 entity) (get entity x2))}) (keys fields-mapping) (vals fields-mapping)))))

(defn list-result [elements total]
  {:success true
   :totalCount total
	 :data elements})

(defn load-or-create-entity [entity entity-key make-entity]
  (let 
    [result  
      (if-not 
        (nil? entity-key) 
        (first (query/select (query/where user ([= :key (types/to-key entity-key)])))))]
    (if 
      (nil? result) 
      (make-entity) 
      result)))

(defn create-pseudo-entity-map [values keys]
  (apply 
      merge 
      (map 
        #(assoc {} (keyword %) (get values %)) 
        keys)))

; ------------------- extending json

(extend com.google.appengine.api.datastore.Key json/JSONWriter
    {:-write 
     (fn [x #^PrintWriter out] 
       (.print out 
         (str \" (types/to-webkey x) \")))})

(def default-date-formatter (java.text.SimpleDateFormat. "yyyy.MM.dd HH:mm:ss"))

(extend java.util.Date json/JSONWriter
    {:-write 
     (fn [x #^PrintWriter out] 
       (.print out 
         (str \" (.format default-date-formatter x) \")))})