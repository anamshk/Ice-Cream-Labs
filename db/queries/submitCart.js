/**
 *  submit cart to admin and set status to "submitted"
 * @param {{user_id: string}}
 * @return {Promise<{}>}
 */

 module.exports = (db) => {
  const submitCart = (userID) => {
    return db
   .query(`UPDATE order_master
   SET status = 'submitted'
   WHERE user_id = $1;`, [userID])
    .then((result) => {
      console.log("cart submitted!");
      return "success! cart submitted";
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

  return { submitCart };
};
