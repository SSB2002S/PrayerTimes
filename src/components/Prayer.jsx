const Prayer = ({ name, time }) => {
  return (
    <div className='flex justify-between bg-emerald-50 text-emerald-700 not-last:mb-3 p-1 rounded'>
      <p className='name'>{name}:</p>
      <p className='time'>{time}</p>
    </div>
  );
};

export default Prayer;
