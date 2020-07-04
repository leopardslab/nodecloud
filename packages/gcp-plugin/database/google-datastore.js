class GCD {
  /**
   * GCD constructor
   * @constructor
   * @param {object} google - google SDK
   */
  constructor(google) {
    this._google = google;
    this._gcd = new this._google.datastore(this._google._config);
  }
  /**
   * Create item
   * @createItem
   * @param {object} params
   */
  createItem(params) {
    const key = this._gcd.key([params.key]);
    const { data } = params;

    // create record / item
    return this._gcd.save({
      key,
      data
    });
  }
  /**
   * Delete item
   * @deleteItem
   * @param {object} params
   */
  deleteItem(params) {
    const key = this._gcd.key(params.key);

    // delete record / item
    return this._gcd.delete(key);
  }
  /**
   * Update item
   * @updateItem
   * @param {object} params
   */
  updateItem(params) {
    const key = this._gcd.key(params.key);
    const { data } = params;

    // update record / item
    return this._gcd.save({
      key,
      data
    });
  }
  /**
   * Get query object
   * @getQuery
   * @param {object} params
   */
  getQuery(params) {
    return this._gcd.createQuery(params.key);
  }
  /**
   * Query
   * @query
   * @param {object} params
   */
  query(params) {
    const { query } = params;
    // run query
    return this._gcd.runQuery(query);
  }
}

module.exports = GCD;
