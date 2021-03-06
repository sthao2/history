const React = require('react');
const VideoListItem = require('./videoListItem.jsx');

const VideoList = (props) => {
  const {
    onVideoSelect,
    videos,
  } = props;
  const videoItems = videos.map((video, index) => <VideoListItem index={index} onVideoSelect={onVideoSelect} key={video.etag} video={video} />);

  return (
    <nav id="video-list">
      {videoItems}
    </nav>
  );
};

module.exports = VideoList;
