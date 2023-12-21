class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
    //Kako bi mogli chainat metode moramo returnati this; this je cijeli objekt
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); //DEFAULT
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
      // Only selecting few field names is called PROJECTING
    } else {
      this.query = this.query.select('-__v'); //Excluding __v field
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1; // by default page 1
    const limit = +this.queryString.limit || 100; //by default 100
    // Create a copy of the query before applying pagination
    const countQuery = { ...this.query.getQuery() };

    // Separate query to get the total count
    const totalDocs = this.query.model.countDocuments(countQuery);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    this.totalDocs = totalDocs;
    return this;
  }
}
module.exports = APIFeatures;
