
export class IDGenerator {
   
    static counter = 0

    static generate() {
        
        const timestamp = Date.now().toString(36)
        const random = Math.random().toString(36).substring(2,6)
        const counter = (this.counter++).toString(36)

        return `${timestamp}-${random}-${counter}`
    }

}