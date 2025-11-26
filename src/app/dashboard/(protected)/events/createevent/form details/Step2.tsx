

const Step2 = ({ data, updateField }: any) => {
  return (
    <div>
         <div>
      <input type="file" accept="image/*" onChange={e => e.target.files && updateField("image", e.target.files[0])} />
      {data.image && <p>Selected: {data.image.name}</p>}
    </div>
    </div>
  )
}

export default Step2