/**
 * Created by a on 5/5/2015.
 */

var logger = require("./LogHandler/CommonLogHandler.js");
logger.logger.info("Test message");
logger.logger.error("Test message");
logger.logger.warn("Test message");
logger.logger.debug("Test message");

var generate = require("./Reference/ReferenceGen").generate;


generate(103, 1, function(success, ref, id){

    logger.logger.debug(success);
    logger.logger.debug(ref);
    logger.logger.debug(id);
});
