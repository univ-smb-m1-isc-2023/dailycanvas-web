import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {type Entry} from "../../model/entry";
import {EntryTypeService} from "../entry-type/entry-type.service";
import {FormGroup} from "@angular/forms";
import {type Challenge} from "../../model/challenge";
import axios from "axios";
import {API_URL} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends GenericService<Entry>{

  constructor(private entryTypeService: EntryTypeService) {
    super('entry');
  }

  async getAllEntriesOfUser(id: number): Promise<Entry[]> {
    const response = await axios.get(`${API_URL}/${this.url}/get-all-of-user/${id}`);
    return response.data;
  }

  async getAllChallengeEntriesOfUser(id: number): Promise<Entry[]> {
    const response = await axios.get(`${API_URL}/${this.url}/get-all-of-challenge-and-user/${id}`);
    return response.data;
  }

  async getAllEntriesOfStartChallengeOfUser(id: number): Promise<Entry[]> {
    const response = await axios.get(`${API_URL}/${this.url}/get-all-of-start-challenge-and-user/${id}`);
    return response.data;
  }

  checkErrors(form: FormGroup, challenge: Challenge): void {
    if(this.isText(challenge) && !form.value.textResponse){
      form.get('textResponse')?.setErrors({required: "TextResponse is required"})
    } else if(! this.isText(challenge)){
      form.get('textResponse')?.setErrors(null)
    }
    if(this.isNumber(challenge) && !form.value.numberResponse){
      form.get('numberResponse')?.setErrors({required: "NumberResponse is required"})
    } else if(! this.isNumber(challenge)){
      form.get('numberResponse')?.setErrors(null)
    }
    if(this.isEmojis(challenge) && !form.value.emojiResponse){
      form.get('emojiResponse')?.setErrors({required: "EmojiResponse is required"})
    } else if(! this.isEmojis(challenge)){
      form.get('emojiResponse')?.setErrors(null)
    }
  }

  isText(challenge: Challenge): boolean {
    if(challenge){
      return this.entryTypeService.entryTypesIsText(challenge.entryTypes)
    }
    return false;
  }

  isNumber(challenge: Challenge): boolean {
    if(challenge){
      return this.entryTypeService.entryTypesIsNumber(challenge.entryTypes);
    }
    return false;
  }

  isEmojis(challenge: Challenge): boolean {
    if(challenge){
      return this.entryTypeService.entryTypesIsEmoji(challenge.entryTypes);
    }
    return false;
  }
}
