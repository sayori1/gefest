import { get, writable, type Writable } from "svelte/store";

export let tags: Writable<string[]> = writable([]) ;

export function findTag(name: string): string[] {
    return get(tags).filter(tag => tag.includes(name));
  }

  export function addTag(name: string): void {
    tags.update((tags)=>[...tags,name]);
  }

  export function deleteTag(name: string): void {
    tags.update((tags) => tags.filter((tag)=>tag !== name));
  }