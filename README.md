# eveql
<B>Hello!</B> 

Welcome to the <B>Eveql</B> project! If you are an Eve online player or an enthusiast for working with economic data, then this project should interest you.

This project was created in attempts to gain more solid understanding with Node.JS, MySQL, and Angular2.js

<B>3/22/2017 -</B>
As of this point I have been focused on node.js and creating applications that can retrieve item name input and return all of the required materials to create objects that can be manufactured in the game. (materialFinder.js)

There is also a very small and raw perspective on the economic data that will be needed to help fine tune the whole application for my manufacturing analysis tool. This application will, in the future, be used to perform an entire scan and market analysis in order to find the best items to invest and trade for the day related to volume and price. (ecSpreadFinder.js)

<B>3/27/2017 -</B>
This week has been productive albeit the lack of commits. I've been working on my node.js skills with callbacks and promises.

Once I've mastered the basics, ecSpreadFinder.js will be committed with updates that retrieve and process info for more than one object, and this can be adjusted via the integrated SQL.

I've deferred from using Sequelizer for now until I can test the speed differences between Raw SQL Transactions vs Sequelize Updates.

I've created a Kanban board for objectives and goals in order to gauge progress and create an atmosphere of community. 
Contact me to be added to the Kanban board, and for information regarding the Discord Server for more open communication.

<B>4/3/2017 -</B>
Over the weekend I was able to make a solid breakthrough in both the database and processing for economic data found within the eve_economy table. ecSpreadFinder.js has been completed to a degree, albeit some problems with the data and the service we are using. Some exception handling needs to be put in place for the response related to items that are non-marketable within the database. I'll also be removing any non-marketable items from the database, along with items that have 0 economic value after a full iteration of economic processing.

<B>4/10/2017 -</B>
Greetings fellow developers and pilots!
This week's efforts will be focused on organizing and cleaning up the JSON data constructs for the materialFinder.js and integrating the application for that on the web server as a restful service using the GET method. Once this is accomplished, some fine tuning will be done with some other inputs to adjust the actual required materials as we take into account the blueprint efficiencies and structure material bonuses for manufacturing items within the game. 

Anything after that will be geared towards the web app so users can interact with the service. Fly Safely. o7

Feel free to post any suggestions for the algorithm and error handling.

_____________________________________________________________________________
The economic data will be retrieved from api.eve-central.com.

I am using MySQL to organize item and economic data, it should be found within the repo for you to mimic the table structures if need be.

If you are interested in pursuing one of the backend projects or features feel free to contact me about it at CR.CarlosAndres@gmail.com.

Also, if you are more interested in frontend, there will be a section of folders attributed to the Angular 2.4 framework to display all of our wonderful data that we have processed and accumulated.

Thank you very much, and enjoy.
