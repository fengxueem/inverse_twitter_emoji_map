var mongo = require('mongodb');
var Twit = require('twit');

// create a new database on server
var mdbServer = mongo.Server('localhost', 27017, { 'auto_reconnect': true });
var mdb = mongo.Db('streaming_db_v', mdbServer);
var tweetCount = 0;
var emojis = '😀,😬,😁,😂,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,☺️,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤗,😏,😶,😐,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,🙁,☹️,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,😪,😓,😭,😵,🤐,😷,🤒,🤕,😴,💩,😈,👿,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🐵,🙈,🙉,🙊';

var mdbTweets = {
    saveTweets: function() {
        mdb.open(function(err, db) {
            if (!err) { console.log('Connected to streaming_db_v@localhost:27017'); }
            // ensure to create a new collection everytime.
            db.dropCollection('tweets');
            db.createCollection('tweets', function(err, collection) {
                //connecting to twitter
                var T = new Twit({
                    consumer_key: '6h6GrZeFSVEsr3gFKbAO2Q5A1',
                    consumer_secret: 'b0EzhxDxJYVFcfU3xEtD1nrViMrjCb18JRhigaYKvpnhKrHuRE',
                    access_token: '851864518993092610-pq1DIanzIcQ7Jaovy3DkCZ4Rm7cXpQZ',
                    access_token_secret: 'R3dJTtQToBtUkAgFlFCMrnIrMD7r5GM9C9hTKyRwx66uR',
                    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
                });
                var stream = T.stream('statuses/filter', { track: emojis });
                stream.on('tweet', processTweets);

                //add neccessary attributes to tweets and insert them into database.
                function processTweets(tweet) {
                    try {
                        if (tweetCount < 1000000) {
                            var parsedTweet = tweet;
                            if (parsedTweet.id && parsedTweet.id_str) {
                                parsedTweet._id = new mongo.Long.fromString(parsedTweet.id_str, 10);
                                parsedTweet._createdDate = new Date(parsedTweet.created_at);
                                parsedTweet._negEmoji = getNegEmoji(parsedTweet.text);
                                parsedTweet._posEmoji = getPosEmoji(parsedTweet.text);
                                collection.insertOne(parsedTweet, function(err, result) {
                                    if (err) {
                                        console.log("Error writing document to database. Most likely a duplicate.");
                                    } else {
                                        if (result.insertedCount === 1) {
                                            //console.log(tweetCount + " tweets saved:" + "; " + tweet.text);
                                        }
                                    }
                                });
                                tweetCount++;
                            }
                        } else {
                            stream.stop();
                            db.close();
                            console.log("Database is full.");
                        }
                    } catch (e) {
                        console.log("Exception thrown:" + e.message)
                    }
                }
                //define sentiment
                function getNegEmoji(text) {
                    var negEmojis = ('😶,😐,😑,😒,🙄,🤔,😳,😞,😟,😠,😡,😔,😕,🙁,☹️,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,😪,😓,😭,😵,🤐,😷,🤒,🤕,😴,🙀,😿,😾,🐵,🙈,🙉,🙊').split(',');
                    var negEmojiOccurance = 0;
                    if (text) {
                        // Each emoji consists of two characters.
                        for (var i = 0; i < negEmojis.length; i += 1) {
                            if (hasEmoji(negEmojis[i], text)) {
                                negEmojiOccurance++;
                            }
                        }
                        // console.log('neg' + text + negEmojiOccurance);
                        return negEmojiOccurance;
                    }
                }

                function getPosEmoji(text) {
                    var posEmojis = ('😀,😬,😁,😂,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,☺️,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤗,😏,💩,😈,👿,😺,😸,😹,😻,😼,😽').split(',');
                    var posEmojiOccurance = 0;
                    if (text) {
                        // Each emoji consists of two characters.
                        for (var i = 0; i < posEmojis.length; i += 1) {
                            if (hasEmoji(posEmojis[i], text)) {
                                posEmojiOccurance++;
                            }
                        }
                        // console.log('pos' + text + posEmojiOccurance);
                        return posEmojiOccurance;
                    }
                }

                function hasEmoji(emoji, text) {
                    if (text.indexOf(emoji) > -1) {
                        return true;
                    }
                }
            });
        });
    }
};

module.exports = mdbTweets;