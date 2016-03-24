/**
 * NodeJS Workable API Wrapper
 * @author Aymen Mouelhi <aymen.mouelhi@gmail.com>
 */

var request = require('request');
var noOp = function() {};

/**
 * Sets credentials for Workable access.
 * @param {Object} opts
 */

var Workable = function(opts) {
    //defaults
    opts = opts || {};
    // Access Token
    this.accessToken = opts.accessToken || '';
    // API version
    this.version = opts.version || '3';
};

/**
 * This method creates and returns and instance of Workable
 * @param {Object} opts Options passed along to the Workable constructor.
 */
var createInstance = function(opts) {
    return new Workable(opts);
};

/**
 * Sets API Access Token for Workable access.
 * @param {String} [Token] [API Access Token]
 */
Workable.prototype.setAccessToken = function(token) {
    this.accessToken = token;
};

/**
 * Returns information about all the accounts
 * @param {String} [subdomain] [The account's subdomain]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getAccounts = function(callback) {
    return this._get('/', callback);
};

/**
 * Returns information about an account
 * @param {String} [subdomain] [The account's subdomain]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getAccount = function(subdomain, callback) {
    return this._get('/' + subdomain, callback);
};

/**
 * Returns a collection of an account members
 * @param {String} [subdomain] [The account's subdomain]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getMembers = function(subdomain, callback) {
    return this._get('/' + subdomain + '/members', callback);
};

/**
 * Returns a collection of an account external recruiters
 * @param {String} [subdomain] [The account's subdomain]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getRecruiters = function(subdomain, callback) {
    return this._get('/' + subdomain + '/recruiters', callback);
};

/**
 * Returns a collection of a recruitment pipeline stages
 * @param {String} [subdomain] [The account's subdomain]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getStages = function(subdomain, callback) {
    return this._get('/' + subdomain + '/stages', callback);
};

/**
 * Returns a collection of an account jobs
 * @param {String} [subdomain] [The account's subdomain]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.getJobs = function(subdomain, callback) {
    return this._get('/' + subdomain + '/jobs', callback);
};

/**
 * Get a Job Information
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getJob = function(subdomain, shortcode, callback) {
    return this._get('/' + subdomain + '/jobs/' + shortcode, callback);
};

/**
 * Get a Job's questions
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {Function} callback Method to execute on completion
 */
Workable.prototype.getJobQuestions = function(subdomain, shortcode, callback) {
    return this._get('/' + subdomain + '/jobs/' + shortcode + '/questions', callback);
};

/**
 * Get a Job's members
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.getJobMembers = function(subdomain, shortcode, callback) {
    return this._get('/' + subdomain + '/jobs/' + shortcode + '/members', callback);
};

/**
 * Get a Job's recruiters
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.getJobRecruiters = function(subdomain, shortcode, callback) {
    return this._get('/' + subdomain + '/jobs/' + shortcode + '/recruiters', callback);
};

/**
 * Get a Job's candidates
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.getJobCandidates = function(subdomain, shortcode, stage, limit, since_id, max_id, created_after, updated_after, callback) {
    limit = limit || 100;

    var query = '/' + subdomain + '/jobs/' + shortcode + '/candidates?limit=' + limit;

    if (stage) {
        query += '&stage=' + stage;
    } else if (since_id) {
        query += '&since_id=' + since_id;
    }
    return this._get(query, callback);
    //return this._get('/' + subdomain + '/jobs/' + shortcode + '/candidates?stage=' + stage + '&limit=' + limit + '&since_id=' + since_id + '&max_id=' + max_id + '&created_after=' + created_after + '&updated_after=' + updated_after, callback);
};

/**
 * Get a information about a candidate of a Job
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {String} [id] [The candidates's id]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.getJobCandidate = function(subdomain, shortcode, id, callback) {
    // Todo: Update list of parameters !
    return this._get('/' + subdomain + '/jobs/' + shortcode + '/candidates/' + id, callback);
};

/**
 * Create new Candidate
 * @param {String} [subdomain] [The account's subdomain]
 * @param {String} [shortcode] [The job's shortcode]
 * @param {String} [stage] [Depending on the value of the sourced flag, candidates are put into the sourced or applied stage.]
 * @param {Object} [candidate] [The candidate]
 * @param {function} callback Method to execute on completion
 */
Workable.prototype.createCandidate = function(subdomain, shortcode, stage, candidate, callback) {
    return this._post('/' + subdomain + '/jobs/' + shortcode + '/candidates', candidate, callback);
};

/**
 * Builds and executes a Workable api call
 * @param {Object} options or just API URI Path for GET requests
 * @param {Function} callback Function to call upon error or success
 * @returns {Object} error, {Object} data
 */
Workable.prototype._request = function(options, callback) {
    var base = 'https://www.workable.com/spi/v3/accounts';
    callback = callback || noOp; //makes callback not required.

    if (typeof(options) != "string") {
        options.uri = base + options.uri;
    }

    if (this.accessToken) {
        options.headers.Authorization = 'Bearer ' + this.accessToken;
    }

    // Use request to make the http call
    return request(options, function(error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            switch (response.statusCode) {
                case 404:
                    callback(new Error('Path not found'), null);
                    break;
                case 422:
                    callback(new Error(body.error), null);
                    break;
                case 500:
                    callback(new Error(body.error), null);
                    break;
                default:
                    try {
                        if (body) {
                            try{
                                var data = JSON.parse(body);
                                
                                return callback(null, data);
                            }catch(err){
                                return callback(null, body);
                            }
                            
                        }
                        // Some API do not have body content
                        callback(null, response.headers.status);
                    } catch (err) {
                        callback(err, null);
                    }
            }
        }
    });
};

/**
 * Performs a GET
 * @param {String} path API endpoint
 * @param {function} callback Method to execute on completion
 */
Workable.prototype._get = function(path, callback) {
    return this._request({
        uri: path,
        headers: {}
    }, callback);
};

/**
 * Performs a PUT
 * @param {String} path API endpoint
 * @param {Object} body Data
 * @param {function} callback Method to execute on completion
 */
Workable.prototype._put = function(path, body, callback) {
    body = body || '{}';
    return this._request({
            uri: path,
            method: "PUT",
            headers: {
                "Content-Length": body.length
            },
            body: body
        },
        callback);
};

/**
 * Performs a PATCH
 * @param {String} path API endpoint
 * @param {Object} body Data
 * @param {function} callback Method to execute on completion
 */
Workable.prototype._patch = function(path, body, callback) {
    body = body || '{}';
    return this._request({
            uri: path,
            method: 'PATCH',
            headers: {
                'Content-Length': body.length
            },
            body: body
        },
        callback);
};

/**
 * Performs a POST request
 * @param {String} path API endpoint
 * @param {Object} body Data
 * @param {function} callback Method to execute on completion
 */
Workable.prototype._post = function(path, json, callback) {
    json = json || '{}';
    return this._request({
            uri: path,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            json: json
        },
        callback);
};

/**
 * Performs a DELETE
 * @param {String} path API endpoint
 * @param {Object} body Data
 * @param {function} callback Method to execute on completion
 */
Workable.prototype._delete = function(path, body, callback) {
    body = body || '{}';
    return this._request({
            uri: path,
            method: "DELETE",
            headers: {
                "Content-Length": body.length
            },
            body: body
        },
        callback);
}

// Export factory method
module.exports = createInstance;