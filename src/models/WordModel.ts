import LetterModel from "./LetterModel";

export default interface WordModel extends LetterModel {
  letters: LetterModel[];
}
