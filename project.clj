(defproject fleet-control "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dev-dependencies [[lein-ring "0.2.4"]]
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/tools.logging "0.2.4"]
                 [com.google.appengine/appengine-api-1.0-sdk "1.7.2.1"]
                 [com.google.appengine/appengine-testing "1.7.2.1"]
                 [com.google.appengine/appengine-api-stubs "1.7.2.1"]
                 [com.google.appengine/appengine-api-labs "1.7.2.1"]
                 [ring "1.0.1"]
                 [compojure "1.0.1"]
                 [org.clojure/data.json "0.2.1"] 
                ]
  :aot [fleet-control.core]
  :ring {:handler fleet-control.core/app})