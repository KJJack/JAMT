import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    prereqs: {
      type: [String],
      required: false,
    },

    contacted: {
      type: Boolean,
      default: false,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },

    contactedAt: {
      type: Date,
    },

    interviewDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ApplicationSchema.pre("save", function (next) {
  if (this.isModified("contacted") && this.contacted && !this.contactedAt) {
    this.contactedAt = new Date();
  }
  next();
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
