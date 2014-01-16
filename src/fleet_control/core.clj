(ns fleet-control.core
  (:use (compojure handler [core :only(GET POST defroutes)]))
  (:require [ring.util.response :as response]
            [ring.util.servlet :as servlet]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [fleet-control.utils :as utils]
            [fleet-control.user :as api-user]
            [fleet-control.fleet :as api-fleet]
            [fleet-control.pairing :as api-pairing]
            [fleet-control.control :as api-control]
            [fleet-control.account :as api-account]
            [ring.middleware.session :as session])
  (:import (com.google.appengine.api.datastore DatastoreServiceFactory DatastoreService Entity Key KeyFactory Query Query$FilterOperator)
           (com.google.appengine.tools.development.testing LocalDatastoreServiceTestConfig LocalServiceTestHelper)))

(def datastoreService (DatastoreServiceFactory/getDatastoreService))

(defn setup [w]
  (fn [request] (w) "Setup concluded!"))

; Routing
(defroutes app*

  ; initial content setup
  ;(GET "/setup/user" request (setup api-user/setup))
  ;(GET "/setup/account" request (setup api-account/setup))
  ;(GET "/setup/fleet" request (setup api-fleet/setup))
  ;(GET "/setup/pairing" request (setup api-pairing/setup))
  ;(GET "/setup/control" request (setup api-control/setup))

  ; functional
  ; pairing
  (POST "/api/pairing/read"    request (utils/json-wrapper api-pairing/list-records))
  (POST "/api/pairing/save"    request (utils/json-wrapper api-pairing/save))
  (GET  "/api/pairing/release" request (api-pairing/release))
  (GET  "/api/pairing/pair"    request (api-pairing/pair))
  ; user
  (POST "/api/user/save"       request (utils/json-wrapper api-user/save))
  (POST "/api/login"           request (utils/json-wrapper api-user/login))
  (POST "/api/login/read"      request (utils/json-wrapper api-user/list-logged-user))
  ; fleet
  (POST "/api/fleet/save"      request (utils/json-wrapper api-fleet/save))
  (POST "/api/fleet/read"      request (utils/json-wrapper api-fleet/list-records))
  ; test
  ;(GET "/testjson" request (json-wrapper function))
  ;(POST "/user/save" request (json-wrapper something))

  ; resources
  (route/resources "/")

  ; error handling
  (route/not-found (str "Page not found!"))
)


(defn wrap-request-logging [handler]
  "Perform some loggin within the execution of the request."
  (fn [{:keys [request-method uri] :as req}]
    (. (LocalServiceTestHelper. (into-array [(LocalDatastoreServiceTestConfig.)])) setUp)
    (api-user/setup)
    (let [
          start (System/currentTimeMillis)
          response (handler req)
          finish (System/currentTimeMillis)
         ]
      (println "time to handle " req " of " request-method " " uri " was " (- finish start) "ms")
      response)))

(def app (compojure.handler/site (-> app* session/wrap-session wrap-request-logging)))

(servlet/defservice app)

; To run locally:
 (use '[ring.adapter.jetty :only (run-jetty)])
 (defonce server (run-jetty #'app {:port 8082 :join? false}))