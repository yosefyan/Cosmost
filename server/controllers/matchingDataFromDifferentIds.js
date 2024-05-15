import mongoose from "mongoose";

const matchingDataFromDifferentIds = (
  schema,
  identifier = "_id",
  dataToReturn,
  isMongoId = true
) => {
  return async (req, res) => {
    try {
      const requestedIds = req.params.ids
        .split("-")
        .map((id) =>
          isMongoId ? new mongoose.Types.ObjectId(id.trim()) : id.trim()
        );

      const results = await schema
        .aggregate([
          {
            $match: {
              [identifier]: { $in: requestedIds },
            },
          },
          {
            $lookup: {
              from: schema.collection.name,
              localField: identifier,
              foreignField: identifier,
              as: "matchingData",
            },
          },
          {
            $unwind: "$matchingData",
          },
          {
            $project: {
              ...dataToReturn,
            },
          },
        ])
        .exec();

      const duplicatedResults = [...new Set(results.map(JSON.stringify))].map(
        JSON.parse
      );

      if (duplicatedResults.length === 0) {
        return res.status(404).json([]);
      }

      return res.status(200).json(duplicatedResults);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default matchingDataFromDifferentIds;
