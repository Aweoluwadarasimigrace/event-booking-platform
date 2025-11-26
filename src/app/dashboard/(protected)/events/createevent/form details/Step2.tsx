

const Step2 = ({ data, updateField, errors }: any) => {
  return (
    <div>
         <div>
      <input type="file" accept="image/*" onChange={e => e.target.files && updateField("image", e.target.files[0])} />
      {data.image && <p>Selected: {data.image.name}</p>}
       {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
    </div>
  )
}

export default Step2