import requests as req
from bs4 import BeautifulSoup as bs

#python3로 멜로차트 TOP100의 순위, 곡정보, 앨범, 좋아요수를 크롤링

def crawl_melon_chart():
    url = 'https://www.melon.com/chart/index.htm'

    # HTTP GET 요청
    response = req.get(url)
    html = response.text

    # BeautifulSoup 객체 생성
    soup = bs(html, 'html.parser')

    # 멜론 차트 데이터 추출
    chart_list = []

    chart_elements = soup.select('.lst50, .lst100')
    for element in chart_elements:
        rank = element.select_one('.rank').text.strip()
        title = element.select_one('.ellipsis.rank01 > span > a').text.strip()
        artist = element.select_one('.ellipsis.rank02 > a').text.strip()
        album = element.select_one('.ellipsis.rank03 > a').text.strip()
        likes = element.select_one('.button_etc.like > span.cnt').text.strip()

        song_info = {
            'rank': rank,
            'title': title,
            'artist': artist,
            'album': album,
            'likes': likes
        }

        chart_list.append(song_info)

    # 추출한 멜론 차트 데이터 출력
    for song in chart_list:
        print(f"Rank {song['rank']}: {song['title']} - {song['artist']}")
        print(f"Album: {song['album']}")
        print(f"Likes: {song['likes']}")
        print("-------------------------")

# 멜론 차트 크롤링 함수 호출
crawl_melon_chart()
