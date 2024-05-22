import { Subscriber } from "../model/subscriber.model.js";

const getAllSubscribers = async (req, res) => {
  try {
    const subscriber = await Subscriber.find();
    console.log("Subscribers Names:", subscriber);
    if (subscriber.length > 0) {
      res.status(200).json(subscriber);
    } else {
      res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscribersNames = async (req, res) => {
  try {
    const subscribersNames = await Subscriber.find(
      {},
      { name: 1, subscribedChannel: 1, _id: 0 }
    );
    if (subscribersNames.length > 0) {
      res.status(200).json(subscribersNames);
    } else {
      res.status(404).json({ message: "Subscribers names not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscriberById = async (req, res) => {
  try {
    const id = req.params.id;
    const subscriberId = await Subscriber.findById(id);

    if (subscriberId) {
      res.status(200).json(subscriberId);
    } else {
      res.status(404).json({ message: " Subscribers id not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllSubscribers, getSubscribersNames, getSubscriberById };
