##

2022-11-09
Yesterday and today marked the first steps in my journey of creating a full scale, deployable web app with a team of three other Hack Reactor cohort mates. Jonathan C., Ovidiu Buta, and Eugene Hong I are designing and building a trivia based single player game using ReactJS, FastAPI, MongoDB and Redux, which will track user game stats, incorporate a simple social networking feature, and *as stretch goals* integrate game music + a modern GUI.

I'll be chronicling our progress here, as we weave together user authentication, gameplay, and myriad APIs. I know it won't be easy, but I'm excited to take the next step towards becoming a full stack web developer!

2022-11-14
Today we finished our api endpoint markdown and began planning our project implementation. I set up API Endpoint, React/Redux frontend, and Documentation boards on Trello and led the standup/standown. In tandem with our design overview, we worked individually through the FastAPI tutorial videos to familiarize ourselves with the new framework.
I find FastAPI / PostgreSQL to be quite dense so far, and am looking forward to completing more tutorials and getting a few of our endpoints up and running by the end of the week. Excited to learn about authorization bearer tokens, and will try to get a basic version of the game working in React by next week.

2022-11-16
We focused on getting the game and user databases up and running today using PostgreSQL and FastAPI. It was not easy, and I felt rather frustrated along the way, but we got there! After lunch, I led a codealong where we built our FastAPI routers, db, sql and main.py files from scratch and tested our endpoints. Of course we ran into bugs along the way, but with each other's help, and some much appreciated instructor guidance, we got our CRUD (mostly) functioning for the users and games apis.
Next up on our list for the week is authorization and authentication. Eugene and Ovidiu will be leading a code along to implement auth into our backend on Friday.

2022-11-18
Yesterday and today we went through the JWTDown auth tutorial for Galvanize's auth dependency. Though there were several differing examples of implementation, we managed to get a working User authentication/authorization functionality, including login, logout and signup endpoints. As a team, we talked about where our individual levels of understanding are, and how to best move forward so that everyone can uniquely contribute to the project development.

2022-11-21
Over the weekend, I began exploring Redux through several YouTube tutorial videos. Today, the team planned out our week based on learning Redux, finishing up auth on the backend, and implementing a basic React frontend representation of user data. I am feeling motivated to get as much of our mvps done before next week as possible, so we can work on stretch goals and ultimately deployment.


2022-11-22
Today we continued to explore Redux Toolkit. I finished up wrapping the backend API endpoints for create game score and get games in authenticator reqs. In the second half of the day, the team explored the repo from the earlier lecture on Redux, talking through most of the code. Eugene then lead the code along to begin implementing Redux Toolkit in our project repo.

2022-11-23
Today was a hard push to get a login component up and running in conjunction with the redux store and user endpoint reducers. With some help from Nick, some extra research, and some grit and determination, we got there. Successfully able to login and navigate to another component, storing token in state.

2022-11-28
Wow. Today was a major push. It took basically all day, but I was finally able to get authentication working on the game play and user profile endpoints. Now, once the game ends, the score is sent as an async post request to the games database for the logged in user. And, once the user is authenticated, they can see a table of their own game history. It's unstyled, and we have a lot more work to do, but it felt really good to get these pieces of RTK auth and api requests connected.

2022-11-29
Blockers galore. Today, we started the grueling task of converting much of the variable declarations in the trivia game component from let to const in order to use state setting hooks for them instead of custom function calls. When Ovidiu first implemented the game, he had initally tried using all const [state, setState] = useState() declarations but ran into a lot of issues with how data was being processed and updated as game play progressed, so he reverted to let for many of the game state variables. We will most likely spend tomorrow finishing up the conversion.

2022-11-30
Success! I implemented a timer in the game, along with converting the state declarations to almost entirely const, per React conventions. With some instructor help and a cohort mate assist, we reached some revelations about handling question data from the trivia endpoint, putting the queries for questions and categories into a separate trivia slice in our RTK Redux store. This fixed the CORS blocker that was resulting from the auth headers being included in the queries when they were located in our main (locked down) api slice.

2022-12-02
Yesterday and today we polished aspects of the game, implementing the drop down selects for categories and difficulty levels, as well as fixing a blocker with the timer that came up because when time goes to 0, if an answer hasn't been clicked, question count (which index we are on for the list of question objects we're pulling from the trivia api query's question data response) is supposed to increment so we can move to the next question. I may continue to work on using a callback that correctly updates count, but for now the working solution is reverting count to let and 'manually' incrementing count by returning count = count + 1 when we call incrementCount().
We have to finish styling the site, write up our docs, compose our tests and implement our CI/CD next week. A lot to do, but I'm confident we will get there as a team!

2022-12-04
Spent all day today trying to fix the issue with the timer not correctly updating the count. Was still running into the issue of asynchronous state update calls. After another hellishly frustrating day of working on it I realized I shouldn’t be trying to do EITHER OR (either state for count-only works for selection or let / variable for count-only works for timer). I should be doing BOTH AND.
So I changed getQuestion to accept current count, which has to be passed in when that’s called. Then initialized a tempCount variable not in state that updates upon timer reaching 0, and “talks” to state count. They basically respond to each other updating so they stay current but this way the selection can update state and the timer can increment the variable and both get passed into getQuestion when needed.

2022-12-05
We have come so far, but it still feels like we have a lot to do over the final four days of our sprint. The user profile is lacking style and some basic functionality that I believe are important parts of the MVP. The leaderboard is similarly lacking style and any sort of filters. I'd be lying if I said I wasn't disappointed by the progress on those two components, as I've put all my efforts into getting the back end functionality, front end RTK integration, and game play to work properly. I am optimistic we will still get across the finish line with a decent suite of features, but am worried it will come down to the wire. Today, I discovered late that the final score mutation was triggering twice, both times in the get question's try/catch block. Finally figured out this was because the timer was reaching 0 after the final score was sent, triggering getQuestion again and thus sending the score a second time. Added a conditional to the timer===0 block that took care of this.

2022-12-06
Closing in our final push towards CI/CD and project submission. 
