import { FootyNoun, FootyClub } from '../generated/schema';
import {
  ClubNamed,
  FootyNamed,
  FootyNames,
} from '../generated/FootyNames/FootyNames';

export function handleClubNamed(event: ClubNamed): void {
  let club = FootyClub.load(event.params.owner.toHexString());

  let contract = FootyNames.bind(event.address);
  let name = contract.clubNames(event.params.owner);

  if (club) {
    club.name = name;
    club.save();
  }
}

export function handleFootyNamed(event: FootyNamed): void {
  let tokenId = event.params.tokenId.toString();
  let footy = FootyNoun.load(tokenId);

  let contract = FootyNames.bind(event.address);
  let name = contract.footyNames(event.params.tokenId);

  if (footy) {
    footy.name = name;
    footy.save();
  }
}
