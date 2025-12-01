

const Step2 = ({ data, updateField, errors }: any) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700">Upload Image</label>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition">
          <input
            type="file"
            accept="image/*"
            onChange={e =>
              e.target.files && updateField("image", e.target.files[0])
            }
            className="w-full text-sm"
          />

          {!data.image && (
            <p className="text-gray-500 text-sm mt-2">
              Click to upload an image
            </p>
          )}

          {data.image && (
            <p className="text-green-600 font-medium text-sm mt-2">
              Selected: {data.image.name}
            </p>
          )}
        </div>
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

      </div>
    </div>
  );
};

export default Step2;
