export default function TexInput({placeholder, maxLength, ...props}) {
  return (
    <div> 
      <textarea placeholder={placeholder} maxLength={maxLength} {...props} />
    </div>
  );
}

