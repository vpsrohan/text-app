import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const senderId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: senderId } }).select(
      "-password",
    );
    res.status(200).json(filteredUsers);
  } catch (e) {
    console.log("error in getAllContacts controller", e);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatUser = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (e) {
    console.log("err in getChatUser controller", e);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("error in sendMessage controller", e);
    res.status(500).json({ message: "server error" });
  }
};

export const getChats = async (req, res) => {
  try {
    const loggedId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedId }, { receiverId: loggedId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select(-"password");

    res.status(200).json(chatPartners);
  } catch (e) {
    console.log("error in getChats controller", e);
    res.status(500).json({ message: "server error" });
  }
};
