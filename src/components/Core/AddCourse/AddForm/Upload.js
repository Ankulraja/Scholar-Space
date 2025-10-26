import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";

const Upload = ({
  name,
  label,
  register,
  errors,
  setValue,
  video = false,
  viewData = null,
  editData = null,
  pdf = false,
  fileInputRef = null,
  setFileInputRef = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [isLocalFile, setIsLocalFile] = useState(false);
  const inputRef = useRef(null);

  function onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      toast.error(`File rejected: ${rejectedFiles[0].errors[0].message}`);
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      // Validate file size
      const maxSize = video ? 500 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(
          `File too large. Maximum size: ${video ? "500MB" : "10MB"}`
        );
        return;
      }

      setSelectedFile(file);
      preview(file);
      setIsLocalFile(true);
      toast.success(`${video ? "Video" : "File"} selected successfully`);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: video
      ? { "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"] }
      : pdf
      ? { "application/pdf": [".pdf"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
    multiple: false,
    maxSize: video ? 500 * 1024 * 1024 : 10 * 1024 * 1024, // 500MB for video, 10MB for others
  });

  function preview(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [setValue, selectedFile]);

  useEffect(() => {
    if (setFileInputRef && inputRef.current) {
      setFileInputRef(inputRef.current);
    }
  }, [setFileInputRef]);

  useEffect(() => {
    // Set initial state for existing data
    if (viewData || editData) {
      setIsLocalFile(false);
    }
  }, [viewData, editData]);

  return (
    <div>
      <label htmlFor={name} className="text-richblack-25 text-sm">
        {label} <sup className="text-pink-400">*</sup>
      </label>

      <div className="border border-dashed rounded-md border-richblack-300 bg-richblack-700 p-9 mt-2">
        {previewSource ? (
          <div className="flex items-center flex-col justify-center w-full min-h-[250px]">
            {video ? (
              isLocalFile ? (
                <video
                  src={previewSource}
                  controls
                  autoPlay
                  className="max-w-full max-h-[300px] rounded-md"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <ReactPlayer
                  playing={true}
                  controls={true}
                  url={previewSource}
                  width="100%"
                  height="300px"
                />
              )
            ) : (
              <img
                src={previewSource}
                alt="preview"
                className="h-full object-cover"
              ></img>
            )}
            {!viewData && (
              <button
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                  setIsLocalFile(false);
                }}
                className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center" {...getRootProps()}>
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop here
            </p>
          </div>
        )}
      </div>
      {errors[name] && <span>{label} is required</span>}
    </div>
  );
};

export default Upload;
