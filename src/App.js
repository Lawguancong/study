

function App() {

  const ss = 'hello world'
  const uni = Array.from(ss)
  console.log('uni',uni)

  const cc = uni.reduce((prev, next, idx, initial) => {
    if (initial[idx].trim()){
      console.log('idx', idx)
      console.log(initial[idx])
      console.log('prev', prev)
      return {
        ...prev,
        [`${initial[idx]}`]:  prev[`${initial[idx]}`] ? prev[`${initial[idx]}`] + 1 : 1
      }
    } else {
      return prev
    }
  }, {})
  console.log('cc', cc)



  return (
    <div className="App">
     32142314
    </div>
  );
}

export default App;





