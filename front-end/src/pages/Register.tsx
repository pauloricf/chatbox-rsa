import React, { useState } from "react";
import AuthController from "../controllers/AuthController";
import { encryptPrivateKey, generateKeyPair } from "../utils/crypto";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import ImageInput from "../components/inputs/ImageInput";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hooks
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = () => {
    setIsLoading(true);
    if (username.trim().length === 0) {
      addToast("The username is required", "danger");
      return;
    }
    if (username.indexOf(" ") >= 0) {
      addToast("The username can't have blank spaces", "danger");
      return;
    }
    if (password !== confirmPassword) {
      addToast("The passwords does'nt match", "danger");
      return;
    }
    if (image.trim().length === 0) {
      addToast("The profile image is required", "danger");
      return;
    }
    registerUser();
  };

  const registerUser = async () => {
    try {
      const { publicKey, privateKey } = generateKeyPair();
      const encriptedPrivateKey = encryptPrivateKey(privateKey, password);

      await AuthController.register({
        username,
        encrypted_private_key: encriptedPrivateKey,
        password: password,
        public_key: publicKey,
        profile_image: dataUri,
      });

      addToast("User registered successfully", "success");
      navigate("/login");
    } catch (error: any) {
      addToast(
        error.response.data.detail ?? "Error registering user",
        "danger",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Input File State
  const [dataUri, setDataUri] = useState("");
  const [image, setImage] = useState("");

  // Input File Functions

  const fileToDataUri = (file: File) => {
    return new Promise<string | ArrayBuffer | null | undefined>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          resolve(event.target?.result);
        };
        reader.readAsDataURL(file);
      },
    );
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri?.toString() || "");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Register
        </h2>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-2">Username</label>
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mt-4 w-full">
          <ImageInput
            label="Profile Image"
            onChange={onChangeFileInput}
            value={image}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-2">Password</label>
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 text-sm mb-2">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            className="bg-purple-500 w-full hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-purple-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
