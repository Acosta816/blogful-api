
//we are using strings for the date_published on each article in testArticles instead of new Date() because endpoints only return json strings, not objects such as new Date(). 

function createTestArticles(){
  return [
    { id: 1,
      title: 'Sonic Gems, a lost trearure',
      date_published: '2029-01-22T16:28:32.615Z',
      style: 'How-to',
      content: 'ssssssooooonnnnnnniiiiccc iiissss ssoooooo cooooollll' },
    { id: 2,
      title: 'Ice Caverns Spelunking',
      date_published: '2029-01-22T16:28:32.615Z',
      style: 'News',
      content: 'gogogogogog gogogo gogogogo gogogog ogogog ogogg ogogoggogogg' },
    { id: 3,
      title: 'Snowy Peaks of Sweden',
      date_published: '2029-01-22T16:28:32.615Z',
      style: 'Interview',
      content: 'yuuuuuuuuuuuuum tum yum yum yumy uy muymuymuymy uy yuymyumuymuy uym' },
    { id: 4,
      title: 'Fishing with Hot Cocoa',
      date_published: '2029-01-22T16:28:32.615Z',
      style: 'Listicle',
      content: 'Snowmen finshishihsidnf nsiduhf  sndnfundsi hnisdubnsiudfis' },
    { id: 5,
      title: 'Emerald Coast',
      date_published: '2029-01-22T16:28:32.615Z',
      style: 'Story',
      content: 'beachchyyy getawayyyy sdaf;lkj loooooooooooooooooooooookkkkk tttttrreeaaassuurreee' }
  ]
}


module.exports = {
  createTestArticles
}