import { evaluate } from "mathjs";

export default function InputController(input) {
    try {
        return evaluate(input)
    } catch (err) {
        return "Error"
    }
}