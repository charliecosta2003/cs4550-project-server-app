import model from "./model.js";

export const createFollow = (followerId, followingId) =>
    model.create({follower: followerId, following: followingId});

export const findFollow = (followerId, followingId) =>
    model.findOne({follower: followerId, following: followingId});

export const findUserFollowers = (userId) =>
    model.find({following: userId}).populate("follower").exec();

export const findUserFollowing = (userId) =>
    model.find({follower: userId}).populate("following").exec();

export const deleteFollow = (followerId, followingId) =>
    model.deleteOne({follower: followerId, following: followingId});
