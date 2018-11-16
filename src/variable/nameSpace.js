class Father {
  constructor () {
    this.age = 26
  }
  test () {
    console.log('father',this.age)
  } 
}
class Egg extends Father {
  constructor () {
    super()
    this.name = 'my name is egg'
  }
}
export default new Egg()