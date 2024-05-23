// import { BigInt } from "@graphprotocol/graph-ts"
import {
  FootyNouns,
  // Approval,
  // ApprovalForAll,
  // Mint,
  // OwnershipTransferred,
  Transfer,
} from '../generated/FootyNouns/FootyNouns';
import { FootyNoun, FootyClub } from '../generated/schema';

// export function handleApproval(event: Approval): void {
// Entities can be loaded from the store using a string ID; this ID
// needs to be unique across all entities of the same type
// let entity = ExampleEntity.load(event.transaction.from.toHex())
// Entities only exist after they have been saved to the store;
// `null` checks allow to create entities on demand
// if (!entity) {
//   entity = new ExampleEntity(event.transaction.from.toHex())
// Entity fields can be set using simple assignments
// entity.count = BigInt.fromI32(0)
// }

// BigInt and BigDecimal math are supported
// entity.count = entity.count + BigInt.fromI32(1)

// Entity fields can be set based on event parameters
// entity.owner = event.params.owner
// entity.approved = event.params.approved

// Entities can be written to the store with `.save()`
// entity.save()

// Note: If a handler doesn't require existing field values, it is faster
// _not_ to load the entity from the store. Instead, create it fresh with
// `new Entity(...)`, set the fields that should be updated and save the
// entity back to the store. Fields that were not set or unset remain
// unchanged, allowing for partial updates to be applied.

// It is also possible to access smart contracts from mappings. For
// example, the contract that has emitted the event can be connected to
// with:
//
// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.MAX_FREE_SUPPLY(...)
// - contract.MAX_SUPPLY(...)
// - contract.balanceOf(...)
// - contract.contractURI(...)
// - contract.descriptor(...)
// - contract.getApproved(...)
// - contract.isApprovedForAll(...)
// - contract.isLive(...)
// - contract.mintFivePrice(...)
// - contract.mintOnePrice(...)
// - contract.mintThreePrice(...)
// - contract.mintedFree(...)
// - contract.name(...)
// - contract.owner(...)
// - contract.ownerOf(...)
// - contract.renderOnChain(...)
// - contract.seeder(...)
// - contract.seeds(...)
// - contract.supportsInterface(...)
// - contract.symbol(...)
// - contract.tokenByIndex(...)
// - contract.tokenOfOwnerByIndex(...)
// - contract.tokenURI(...)
// - contract.totalSupply(...)
// }

// export function handleApprovalForAll(event: ApprovalForAll): void {}

// export function handleMint(event: Mint): void {}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId.toString();
  // let from = event.params.from;
  let to = event.params.to;

  // load footy nouns contact
  let nounsContract = FootyNouns.bind(event.address);

  let club = FootyClub.load(to.toHexString());

  if (!club) {
    club = new FootyClub(to.toHexString());
    club.owner = to;
    club.name = '';
    club.save();
  }

  let seed = nounsContract.seeds(event.params.tokenId);

  let footy = new FootyNoun(tokenId);

  footy.tokenId = event.params.tokenId;
  footy.background = seed.value0;
  footy.kit = seed.value1;
  footy.head = seed.value2;
  footy.glasses = seed.value3;
  footy.number = seed.value4;
  footy.owner = to;
  footy.club = to.toHexString();

  footy.save();
}
