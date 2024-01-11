//! FUNCTIONS MADE HERE RETURN CONTROLLERS
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

//* Deletes one document
exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      //No content
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No documents found with that ID', 404));
    }
    res.status(200).json({
      staus: 'success',
      requestedAt: req.reqTime,
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  //* To allow for nested GET reviews on tour (hack)
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    //SEND RESPONSE
    res.status(200).json({
      staus: 'success',
      results: doc.length, //When sending array with multiple results QOL
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
