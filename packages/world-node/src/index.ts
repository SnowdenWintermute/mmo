// connect to DB to get world dimensions
// recieve connections from zone nodes asking what part of the world they should serve
// recieve updates from zone nodes about their current player/entity loads
// determine which regions of the world should be split when a new zone node shows up for duty
// determine which regions should be merged when zone loads are low
// assign new regions to connected zone nodes
//  - zone nodes should take care of offloading entities to new bordering nodes when splitting their old(current) region
