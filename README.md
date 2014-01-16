# fleet-control

This application is basically a test application to check new things out there. I just selected a few stuff I wanted to have seen and implemented a test-application.

## What does the application do?

Well, it isn't to make much sense so the idea is to develop an application to perform tracking of android phones. Therefore the following requirements were defined for the application:
 - the application shall be able to handle multiple tracker-users and tracked-users;
 - the application shall create an own environment to the tracker-users so that its tracked-users can't be seen by other users and vice-versa;
 - the tracker-user shall be able to register users to be tracked;
 - the tracked-user shall be able to confirm tracking request;
 - the tracker-user shall be able to assign kind-of vehicle to tracked-user;
 - the tracked-user shall be able to ping the server with current latitude and longitude as much as he wants;
 - the tracker-user shall be able to check in a visual map his tracked-users.

## What technologies are used?

Here is the motivation to implement such application. I wanted to have an application that could be developed using at least:
 - GAE - I have heard so much about such platform and never tried it before, and Google App Engine seems to be a nice solution to solve the operational overhead with application development life-cycle. From GAE I would like to use the deployment process that allows the user to deploy an application to server and manage its operational layer;
 - Clojure - I was always impressed with the beauty of Lisp language syntax and since I read an article about clojure I had it within my list of technologies-to-try;
 - Compojure - it make sense to use a web-framework to perform some abstraction ;);
 - Ext-JS 4 - ohhh yeah, I worked with ExtJS and GXT before, version 2, and it was just awesome! Another thing I had on my list. The modifications done on ExtJS version 3 were so cool and with the version 4 with the Model-View-Controller on client side, that is awesome for a spring-passionate developer;
 - Android - a small application to access the remote API in order to accept/reject tracking and ping server with the latitude and longitude.

## Dependencies

 - In clojure a library were used to perform GAE-DataStore operations. The DSL used is here: [https://github.com/smartrevolution/clj-gae-datastore]
 - ExtJS 4.2 was used and shall be downloaded separatelly from [http://www.sencha.com/] to /src/public/extjs and inflated there;
 - For icons fam-fam-fam was used and can be downloaded from [http://www.famfamfam.com/] to /src/public/resources/icons and inflated there;

## Conclusions

 - **Clojure** is just awesome, is so smooth to implement stuff on it, you can really implement and see stuff working at the same time. If you need to invoke something just to see it working, you can use directly the REPL! ;) My first impression was that it is a cool language but its just for fun, but I was wrong and I would love to work in a productive application using clojure. And what are that Macro feature? So crazy awesome cool!
 - **Compojure** is a cool famework to implement web application using clojure and it is so easy.
 - I never used Google API before, and I used **maps-api** here, its quite easy, I just had problems to get it well integrated to ExtJS;
 - **ExtJS** - wow! The MVC approach for JavaScript is nice, the thing I needed to become used to was the name convention, I just had some problems at the beginning with that where error messages doesn't really helped, but once the names were corrected everything was working smooth;
 - I just used Eclipse to implement the projects and **Android** isn't bad at all, the idea to have kind of commands in a chain (intends) that are processed by different applications was the most impressive thing about it. Beside that its something that needs definitely support from the IDE to avoid some manual work, lots of things to facilitate development are done automatically, specially with the view design.
 - **GAE DataStore** - the hierarchical approach helps a lot for some use-cases, and in this application I could separate the user context with that in such an effitient way that even the development becomes easy with that, performing automatic filter of records owned by an specific user.
