import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // create access token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save({ ValidateBeforeSafe: false });
  
    return {accessToken, refreshToken}
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while generating access and refresh token");
  }
}

const registerUser = asyncHandler(async (req, res) => {
  console.log("Register API HIT");
  const { username, email, password } = req.body;
  console.log("Username: ", username);
  console.log("Email: ", email);
  console.log("Password: ", password);

  if (!username || !email || !password) {
    throw new ApiError(400, "All the fields are required");
  }

  const alreadyExist = await User.findOne({ email })

  if (alreadyExist) {
    throw new ApiError(400, "The user with this email already exist");
  }

  const user = await User.create({
    username,
    email,
    password
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: false
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      createdUser,
      "User registered successfully"
    )
  )
})

export { registerUser }