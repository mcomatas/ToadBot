# ToadBot Documentation
A document providing information on commands for ToadBot and a change log for ToadBot.

## Commands:
- board
    - Gives a random Mario Party 2 board to play on.
- minigame (4P, 2v2, 1v3, battle)
    - Gives a randomMario Party 2 minigame to play based on the parameter given.
- coinrecord
    - get
        - Gives the current coin record achieved (max amount of coins a player has held at once).
    - update (integer)
        - The user is able to enter an integer for a new coin record and ToadBot responds with the newly updated coin record.
- wins 
    - get (Donkey Kong, Wario, Yoshi, Peach)
        - Gives the current amount of total wins based on which player was given for the parameter.
    - update (Donkey Kong, Wario, Yoshi, Peach)
        - Updates the amount of total wins for the player entered as the parameter and replies with the new amount of wins.
- help
    - Gives a link a document to provide the list of commands, change log, and for people to add ideas they want to see.
- meleedoc
    - Gives a link to an old super smash brothers melee document.
- bmt
    - get
        - Gives the current amount of time the MP2AS have seen bmt (Bowser’s Multiplying Toad).
    - update
        - Updates the current amount of bmt by one and gives the newly updated amount.
- toad
    - Uploads a picture of Toad in his horror land garb.
- beer
    - get
        - ToadBot replies with a random beer to get from the list of beers.
    - add (string)
        - User inputs a new beer for ToadBot to add to the list of beers to be randomly picked. ToadBot then replies with the updated list.
    - list
        - ToadBot replies with the current list of beer that can be randomly picked.
- duel (user)
    - The user picks someone to duel, ToadBot will then wait for three seconds and pick a random winner from the user and the other player.
- melee
    - teams
        - ToadBot replies with random melee teams amongst the four MP2AS.
    - codes
        - ToadBot replies with the Slippi melee codes for ease of access.
- shop
    - getbalance
        - ToadBot replies with the user’s balance.
    - myinventory
        - ToadBot replies with the user's inventory.
    - transfer (user, integer)
        - You are able to transfer some of your balance to another user.
    - buy (item)
        - You are able to buy an item from the shop, as long as you have enough currency.
    - items
        - ToadBot replies with a list of items in the shop.
- songs
    - queue (string (youtube link))
        - If no songs are playing ToadBot will join the voice channel of the user and start playing the queued song. If songs are playing and songs are in the queue, ToadBot will add the inputted song to the song queue.
    - playing
        - ToadBot responds with the current song playing.
    - skip
        - Skips the current song playing and moves to the next one.
    - pause
        - Pauses the current song.
    - unpause
        - Unpauses the current song.
    - clear
        - Empties out the song queue.

## Change Log:
- (1.0.0) ToadBot was created and had two main commands to start. It used the “!” as a prefix for commands. It had the commands of “!board” and “!minigame”.
- (1.5.0) ToadBot was updated to work with discord better and was revamped to use slash commands (“/”) instead of the “!” prefix. The coinrecord command was added to keep track of the coin record and to update it whenever it is beaten. ToadBot was also hosted on a virtual private server in order to be running 24/7 for Mario Party 2 All Stars.
- (2.0.0) ToadBot was updated to have a status (I decided on playing a game called “Looking for Jeffery…”). More commands were added such as: wins, help, meleedoc, and bmt.
- (2.0.1) Added a toad, beer, and duel command to ToadBot
- (2.0.2) Changed beer command to make it send the beers all in one message rather than spamming the chat with multiple messages.
- (2.1.0)
    - Added a currency system to MP2AS, users get 1 currency for every message they type in the discord (not including commands). This allows users to buy items which will hopefully give more use in the future.
    - Added a melee command to give random melee teams among the four players, and to give the Slippi codes.
    - Added a rotating status to ToadBot, this includes (“type ‘/help’ for info) in case the user forgets that command.
    - Changed the duel command to not count down externally (ToadBot still waits three seconds before deciding a winner), this is to make it less spammy.
- (2.1.1) Added a music bot to ToadBot to allow users to play songs from youtube inside the voice channel.