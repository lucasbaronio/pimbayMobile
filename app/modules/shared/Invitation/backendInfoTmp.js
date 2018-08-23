import React, { Component } from 'react';

const getUserInfo = (ownerId) => {
    switch (ownerId) {
        case "DDM2AobexaNzHbRyjuYk":
            return {
                id: "DDM2AobexaNzHbRyjuYk",
                userName: "alvaro.scelza",
                fullName: "Alvaro Rodriguez Scelza",
                gender: "MAN",
                mail: "alvarito@alvaro.com",
                avatar: "http://i64.tinypic.com/t6rout.jpg",
                birthdate: "16/08/92",
                creationDate: "16/08/18",
                deleted: false,
                biography: "El alvarito",
                interests: [],
                favoriteUsers: []
            }
        case "Iiz3cW33NF6XQ61EU69x":
            return {
                id: "Iiz3cW33NF6XQ61EU69x",
                userName: "mati_zalynas",
                fullName: "Matias Zalynas",
                gender: "MAN",
                mail: "mati@mail.com",
                avatar: "http://i64.tinypic.com/21abyp2.jpg",
                birthdate: "16/08/92",
                creationDate: "16/08/18",
                deleted: false,
                biography: "Mati",
                interests: [],
                favoriteUsers: []
            }
        default:
            return {
                id: "aguscarrabs",
                userName: "aguscarrabs",
                fullName: "Agustin Carrabs",
                gender: "MAN",
                mail: "agus@mail.com",
                avatar: "http://i67.tinypic.com/2hog13b.jpg",
                birthdate: "16/08/92",
                creationDate: "16/08/18",
                deleted: false,
                biography: "agus",
                interests: [],
                favoriteUsers: []
            }
    }
}

const getContextAction = () => {
    return {
        id: "1",
        title: "A tomar una",
        icon: 'ios-beer',
        type: 'ionicon',
        image: null
    }
}

const getEvent = (eventId) => {
    return {
        id: "0EzifiT6X4NR39g6nvde",
        title: "Matias Agri en Montevideo",
        type:"EVENT",
        realizationDate:"2018-07-26T01:00:00.000+0000",
        place: "Montevideo, Uruguay",
        image:"https://images.sk-static.com/images/media/profile_images/artists/9215129/huge_avatar",
        categories: ["Musica","Concierto"], 
        description: "Doors open: 22:00\nTour name: Por El Bien De Los Dos TOUR\nMatias Agri se presentará por primera vez en Uruguay. En un show acústico super intimo.\nCompra los ticket y enterate de todo en sus redes sociales :\nInstagram: @matiasagri\nTwitter: @matiasagri\nFacebook: /matiasagri",
        dateCreated: null,
        orderByDate: "2018-07-26T01:00:00.000+0000"
    }
}

export {
    getUserInfo,
    getContextAction,
    getEvent
}