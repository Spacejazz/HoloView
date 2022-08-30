# HoloView 
An AR NFT viewer for Universal Profiles avaialble on Android and IOS devloped by the team at [Reality Crisis](https://realitycrisis.io/) 

Team members: 
 - Kasmir Lehto : kasimir.lehto@realitycrisis.io
 - Igor Dmytrus : igor.dmitrus@realitycrisis.io
 - Csaba Bolyós : bladeszasza@gmail.com
 - Vlad Pereverziev : vladyslav.pereverziev@realitycrisis.io
 - Nathan Lienau : nlienau1@gmail.com

## Description

HoloView is a mobile application for Android and IOS that allows users to view all LSP8 based assets stored under a Universal Profile in Augmented Reality. Users can bring assets into an AR environment, place, scale, rotate their assets to a desired position, and then save the position of those assets in space to be re-called at any time.

## Architecture 
Holoview is composed of three main parts the Unity build, Reality Crisis backend, and the L16 test net. 

- The Unity build for HoloView is capable of "scanning" an enviroment producing x,y,z planes and coordinates allowing the user to place digital assets. Once these planes have been produced you are able to load digital assets onto a set coordinate and "anchor" them to the scene. Anchors are local descriptors gathering vectors of data which check for similarities within a scene. These anchors allow the assets to be recalled to the original desired position. 

- The Reality Crisis backend is a middle layer between the Holoview application and the L16 testnet. This middle layer allows us to recall data from the L16 test net and IPFS servers including LSP3, LSP4, and LSP8 assets and metadata. We have also produced a number of utility API calls for this middle layer making functions like creating a Universal Profile, deploying an LSP8 contract, and minting assets much easier. 

- The L16 testnet is Luksos ecosystem containing the assets, profiles, and contracts being called by Holoview. The most important elements for this build are the Universal Profile which acts as the account connecting to Holoview and the LSP8 Contracts which contain the link to the assets and data for objects in Holoview. 

![Architecture Diagram](https://gitlab.com/igor.dmitrus1/lukso_nft/-/raw/Develop/images/archdiagram.png){ width=60%,height:256px }

## Build Documentation 

 - [Back End Documentation ](https://realitycrisis.atlassian.net/wiki/spaces/HOL/pages/2038235137/Backend+layer)
 - [Hollow View Documentation](https://realitycrisis.atlassian.net/wiki/spaces/HOL/pages/2041970692/Holoview+app)

## Video Presentation 
HoloView Lukso Hackathon Presentation 

## Try Holoview 
An invitation to use the Holoview IOS version through Testflight has been sent to 
 - jonathan@lukso.io 
 - callum@lukso.io 
 - jakeprins@outlook.com 
 - yamen@lukso.io 
 - fabian@futureagency.io 
 - hugo@lukso.io 
 - jean@lukso.io 
 - marjorie@lukso.io

Link to Android version 
