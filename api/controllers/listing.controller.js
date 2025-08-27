import Listing from "../models/listingModel.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(200).json({
            success: true,
            data: listing,
        });
    } catch (error) {
        next(error);
    }
};
