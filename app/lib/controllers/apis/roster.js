var MongoClient = require('mongodb').MongoClient;

/**
 * Query players on latest roster given a team code. The req.query.team_code is expected to be populated
 *
 * @param req -
 *            the express request
 * @param res -
 *            the express response
 */
exports.query = function(req, res)
{
    var team = req.query.team,
        query = {
            '$or': [
            {
                'home_name_abbrev': team
            },
            {
                'away_name_abbrev': team
            }]
        },
        options = {
            'sort':
            {
                'start': -1
            },
            'limit': 1
        };


    MongoClient.connect("mongodb://localhost:27017/mlbatbat", function(err, db)
    {
        db.collection('games').find(query, options).toArray(function(err, docs)
        {
            if (docs[0].team[0].id === team) {
                res.json(docs[0].team[0].player);
            } else {
                res.json(docs[0].team[1].player);
            }
            db.close();
        });
    });

};