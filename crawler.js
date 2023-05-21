const axios = require('axios'); //npm packages 설치 필요
const cheerio = require('cheerio'); //cheerio -> npm -i cheerio 설치 필요

// 멜론 차트 크롤링 함수
async function crawlMelonChart() {
  try {
    const url = 'https://www.melon.com/chart/index.htm'; // 멜론 차트 URL

    // 웹 페이지 HTML 가져오기
    const response = await axios.get(url);
    const html = response.data;

    // Cheerio 라이브러리를 사용하여 HTML 파싱
    const $ = cheerio.load(html);

    // 멜론 차트 데이터 추출
    const chartList = [];

    //100위 링크
    $('.lst50, .lst100').each((index, element) => {
      const rank = $(element).find('.rank').text().trim();
      const title = $(element).find('.ellipsis.rank01 > span > a').text().trim(); 
      const artist = $(element).find('.ellipsis.rank02 > a').text().trim();
      const album = $(element).find('.ellipsis.rank03 > a').text().trim();
      const likes = $(element).find('.button_etc.like > span.cnt').text().trim();

      const songInfo = {
        rank,
        title,
        artist,
        album,
        likes,
      };

      chartList.push(songInfo);
    });

    // 추출한 멜론 차트 데이터 출력
    chartList.forEach((song) => {
      console.log(`Rank ${song.rank}: ${song.title} - ${song.artist}`);
      console.log(`Album: ${song.album}`);
      console.log(`Likes: ${song.likes}`);
      console.log('-------------------------');
    });
  } catch (error) {
    console.error('Error occurred during crawling:', error);
  }
}

// 멜론 차트 크롤링 함수 호출
crawlMelonChart();
