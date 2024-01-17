require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Home",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Print",
    "esri/layers/FeatureLayer",
    "esri/widgets/ScaleBar",
    "esri/widgets/CoordinateConversion",
    "chart/chart.umd.js",
], function (esriConfig, Map, MapView, Home, Search, BasemapGallery, LayerList, Legend, Print, FeatureLayer, ScaleBar, CoordinateConversion, Chart) {

    let myChart;

    const map = new Map({
        basemap: "topo-vector",
    });

    const view = new MapView({
        map: map,
        center: [-3.69701, 36.5],
        zoom: 5,
        container: "viewDiv",
        highlightOptions: {
            color: [0, 0, 0, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.2
        },
        popup: {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: false,
                position: "bottom-right"
            }
        },
    });

    view.ui.move("zoom", "top-right");

    const homeBtn = new Home({
        view: view
    });
    view.ui.add(homeBtn, "top-right");

    const basemaps = new BasemapGallery({
        view,
        container: "basemaps-container"
    });

    let scaleBar = new ScaleBar({
        view: view
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });

    const ccWidget = new CoordinateConversion({
        view: view,
        multipleConversions: false,
    });

    const toRemove = ccWidget.formats.filter(format => format.name !== "utm");
    ccWidget.formats.removeMany(toRemove);
    ccWidget.visibleElements = {
        settingsButton: false,
        captureButton: false,
        editButton: false,
        expandButton: false
    };
    view.ui.add(ccWidget, "bottom-right");

    const layerList = new LayerList({
        view,
        selectionEnabled: true,
        container: "layers-container"
    });

    const legend = new Legend({
        view,
        container: "legend-container"
    });

    const print = new Print({
        view,
        container: "print-container"
    });

    let activeWidget;

    const handleActionBarClick = ({ target }) => {
        if (target.tagName !== "CALCITE-ACTION") {
            return;
        }

        if (activeWidget) {
            document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
            document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
        }

        const nextWidget = target.dataset.actionId;
        if (nextWidget !== activeWidget) {
            document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
            document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
            activeWidget = nextWidget;
        } else {
            activeWidget = null;
        }
    };

    document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);

    const parcelas = new FeatureLayer({
        title: "Parcelas de muestreo",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/9",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{parcela_id}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "regbiogeografica",
                    visible: true,
                    label: "Región Biogeográfica",
                },
                {
                    fieldName: "habitat_eunis",
                    visible: true,
                    label: "Hábitat EUNIS"
                },
                {
                    fieldName: "grupos_habitat_ic",
                    visible: true,
                    label: "Grupos Hábitat IC"
                },
                {
                    fieldName: "habitat_g1",
                    visible: true,
                    label: "Hábitat G1",
                },
                {
                    fieldName: "habitat_g2",
                    visible: true,
                    label: "Hábitat G2",
                },
                {
                    fieldName: "habitat_g3",
                    visible: true,
                    label: "Hábitat G3"
                },
                {
                    fieldName: "habitat_g4",
                    visible: true,
                    label: "Hábitat G4"
                },
                {
                    fieldName: "habitat_g5",
                    visible: true,
                    label: "Hábitat G5",
                },
                {
                    fieldName: "habitat_g6",
                    visible: true,
                    label: "Hábitat G6",
                },
                {
                    fieldName: "habitat_g7",
                    visible: true,
                    label: "Hábitat G7"
                },
                {
                    fieldName: "habitat_g8",
                    visible: true,
                    label: "Hábitat G8"
                },
                {
                    fieldName: "habitat_g9",
                    visible: true,
                    label: "Hábitat G9",
                },
                {
                    fieldName: "pendiente",
                    visible: true,
                    label: "Pendiente",
                },
                {
                    fieldName: "elevacion",
                    visible: true,
                    label: "Elevación"
                },
                {
                    fieldName: "observaciones",
                    visible: true,
                    label: "Observaciones"
                },
                {
                    fieldName: "ccaa",
                    visible: true,
                    label: "Comunidad Autónoma"
                },
                {
                    fieldName: "provincia",
                    visible: true,
                    label: "Provincia"
                },
                {
                    fieldName: "ambientetxt",
                    visible: true,
                    label: "ambientetxt",
                },
                {
                    fieldName: "usuario",
                    visible: true,
                    label: "Usuario"
                },
                {
                    fieldName: "rangovisitas",
                    visible: true,
                    label: "Rango Visitas"
                }
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 5,
                    title: "Subtransecto",
                    /*description:
                        "Types of trees that reside in census block {BLOCKCE10}.",*/
                    displayCount: 0,
                    orderByFields: [{
                        field: "parcela_id",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 3,
                    title: "Trampa plato",
                    displayCount: 0,
                    orderByFields: [{
                        field: "parcela_id",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 1,
                    title: "Trampa luz",
                    displayCount: 0,
                    orderByFields: [{
                        field: "parcela_id",
                        order: "asc"
                    }]
                },
            ]
        }
    });
    map.layers.add(parcelas, 1);

    const subtransecto = new FeatureLayer({
        title: "Subtransecto",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/8",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{parcela_id}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "habitat_eunis_1",
                    visible: true,
                    label: "Hábitat EUNIS 1",
                },
                {
                    fieldName: "por_habitat_eunis_1",
                    visible: true,
                    label: "Por Hábitat EUNIS 1"
                },
                {
                    fieldName: "habitat_eunis_2",
                    visible: true,
                    label: "Hábitat EUNIS 2",
                },
                {
                    fieldName: "por_habitat_eunis_2",
                    visible: true,
                    label: "Por Hábitat EUNIS 2"
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "observaciones",
                    visible: true,
                    label: "Observaciones"
                },
                {
                    fieldName: "ccaa",
                    visible: true,
                    label: "Comunidad Autónoma"
                },
                {
                    fieldName: "provincia",
                    visible: true,
                    label: "Provincia",
                },
                {
                    fieldName: "ambientetxt",
                    visible: true,
                    label: "Ambiente",
                },
                {
                    fieldName: "usuario",
                    visible: true,
                    label: "Usuario",
                },
                {
                    fieldName: "rangovisitas",
                    visible: true,
                    label: "Rango Visitas",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 5,
                    title: "Parcela de muestreo",
                    displayCount: 1,
                    orderByFields: [{
                        field: "parcela_id",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 4,
                    title: "Número visita Subtransecto",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.layers.add(subtransecto, 2);

    const tabla_visita_subtransecto = new FeatureLayer({
        title: "Número visita subtransecto",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/15",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_visita}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_visita",
                    visible: true,
                    label: "Fecha visita",
                },
                {
                    fieldName: "id_tecnico_1",
                    visible: true,
                    label: "ID Técnico 1",
                },
                {
                    fieldName: "id_tecnico_2",
                    visible: true,
                    label: "ID Técnico 2",
                },
                {
                    fieldName: "id_tecnico_3",
                    visible: true,
                    label: "ID Técnico 3",
                },
                {
                    fieldName: "nombre_subtransecto",
                    visible: true,
                    label: "Nombre subtransecto",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                }
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 4,
                    title: "Subtransecto",
                    displayCount: 1,
                    orderByFields: [{
                        field: "parcela_id",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 13,
                    title: "Medición Sirfidos",
                    displayCount: 0,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 9,
                    title: "Medición Abejas",
                    displayCount: 0,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 11,
                    title: "Medición Mariposas",
                    displayCount: 0,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_visita_subtransecto);

    const tabla_medicion_mariposas = new FeatureLayer({
        title: "Medición mariposas",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/13",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{nombre_medicion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_hora_inicio",
                    visible: true,
                    label: "Fecha y Hora inicio",
                },
                {
                    fieldName: "nubes_ini",
                    visible: true,
                    label: "Nubosidad al inicio del muestreo",
                },
                {
                    fieldName: "viento_ini",
                    visible: true,
                    label: "Dirección del viento inicial",
                },
                {
                    fieldName: "viento_beaufort_ini",
                    visible: true,
                    label: "Viento beaufort al inicio del muestreo",
                },
                {
                    fieldName: "temp_ini",
                    visible: true,
                    label: "Temperatura al inicio del muestreo",
                },
                {
                    fieldName: "fecha_hora_fin",
                    visible: true,
                    label: "Fecha y Hora final",
                },
                {
                    fieldName: "nubes_fin",
                    visible: true,
                    label: "Nubosidad al final del muestreo",
                },
                {
                    fieldName: "viento_fin",
                    visible: true,
                    label: "Dirección del viento al final del muestreo",
                },
                {
                    fieldName: "viento_beaufort_fin",
                    visible: true,
                    label: "Viento beaufort al final del muestreo",
                },
                {
                    fieldName: "temp_fin",
                    visible: true,
                    label: "Temperatura al final del muestreo",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 11,
                    title: "Número visita subtransecto",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 10,
                    title: "Especies mariposas",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_medicion_mariposas);

    const tabla_especies_mariposas = new FeatureLayer({
        title: "Observación taxones mariposas",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/26",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "taxon_mariposas",
                    visible: true,
                    label: "Taxón observado",
                },
                {
                    fieldName: "numero_ejemplares",
                    visible: true,
                    label: "Número de ejemplares observados",
                },
                {
                    fieldName: "taxon_no_identificado",
                    visible: true,
                    label: "Referencia taxón no identificado",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 10,
                    title: "Medición mariposas",
                    displayCount: 1,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_especies_mariposas);

    const tabla_medicion_sirfidos = new FeatureLayer({
        title: "Medición sirfidos",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/14",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{nombre_medicion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_hora_inicio",
                    visible: true,
                    label: "Fecha y Hora inicio",
                },
                {
                    fieldName: "nubes_ini",
                    visible: true,
                    label: "Nubosidad al inicio del muestreo",
                },
                {
                    fieldName: "viento_ini",
                    visible: true,
                    label: "Dirección del viento al inicio del muestreo",
                },
                {
                    fieldName: "viento_beaufort_ini",
                    visible: true,
                    label: "Viento beaufort al inicio del muestreo",
                },
                {
                    fieldName: "temp_ini",
                    visible: true,
                    label: "Temperatura al inicio del muestreo",
                },
                {
                    fieldName: "fecha_hora_fin",
                    visible: true,
                    label: "Fecha y Hora final",
                },
                {
                    fieldName: "nubes_fin",
                    visible: true,
                    label: "Nubosidad al final del muestreo",
                },
                {
                    fieldName: "viento_fin",
                    visible: true,
                    label: "Dirección del viento al final del muestreo",
                },
                {
                    fieldName: "viento_beaufort_fin",
                    visible: true,
                    label: "Viento beaufort al final del muestreo",
                },
                {
                    fieldName: "temp_fin",
                    visible: true,
                    label: "Temperatura al final del muestreo",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 13,
                    title: "Número visita subtransecto",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 12,
                    title: "Especies sirfidos",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_medicion_sirfidos);

    const tabla_especies_sirfidos = new FeatureLayer({
        title: "Observación taxones sírfidos",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/27",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "tipo_morfologia_sirfidos",
                    visible: true,
                    label: "Tipo de morfología sirfido",
                },
                {
                    fieldName: "subtipo_morfologia_sirfidos",
                    visible: true,
                    label: "Subtipo de morfologia sirfido",
                },
                {
                    fieldName: "taxon_sirfidos",
                    visible: true,
                    label: "Taxón observado",
                },
                {
                    fieldName: "numero_ejemplares",
                    visible: true,
                    label: "Número de ejemplares",
                },
                {
                    fieldName: "taxon_no_identificado",
                    visible: true,
                    label: "Referencia taxón no identificado",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 12,
                    title: "Medición sirfidos",
                    displayCount: 1,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_especies_sirfidos);

    const tabla_medicion_abejas = new FeatureLayer({
        title: "Medición abejas",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/12",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{nombre_medicion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_hora_inicio",
                    visible: true,
                    label: "Fecha y Hora de inicio",
                },
                {
                    fieldName: "nubes_ini",
                    visible: true,
                    label: "Nubosidad al inicio de muestreo",
                },
                {
                    fieldName: "viento_ini",
                    visible: true,
                    label: "Dirección del viento al inicio de muestreo",
                },
                {
                    fieldName: "viento_beaufort_ini",
                    visible: true,
                    label: "Viento beaufort al inicio de muestreo",
                },
                {
                    fieldName: "temp_ini",
                    visible: true,
                    label: "Temperatura al inicio de muestreo",
                },
                {
                    fieldName: "fecha_hora_fin",
                    visible: true,
                    label: "Fecha y Hora de fin",
                },
                {
                    fieldName: "nubes_fin",
                    visible: true,
                    label: "Nubosidad al final del muestreo",
                },
                {
                    fieldName: "viento_fin",
                    visible: true,
                    label: "Dirección del viento al final del muestreo",
                },
                {
                    fieldName: "viento_beaufort_fin",
                    visible: true,
                    label: "Viento beaufort al final del muestreo",
                },
                {
                    fieldName: "temp_fin",
                    visible: true,
                    label: "Temperatura al final del muestreo",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 9,
                    title: "Número visita subtransecto",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 8,
                    title: "Especies abejas",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_medicion_abejas);

    const tabla_especies_abejas = new FeatureLayer({
        title: "Observación taxones abejas",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/23",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "tipo_morfologia_abejas",
                    visible: true,
                    label: "Tipo morfología abeja",
                },
                {
                    fieldName: "subtipo_morfologia_abejas",
                    visible: true,
                    label: "Subtipo de morfologia abeja",
                },
                {
                    fieldName: "taxon_abejas",
                    visible: true,
                    label: "Taxón observado",
                },
                {
                    fieldName: "numero_ejemplares",
                    visible: true,
                    label: "Número de ejemplares observados",
                },
                {
                    fieldName: "taxon_no_identificado",
                    visible: true,
                    label: "Referencia taxón no identificado",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 8,
                    title: "Medición abejas",
                    displayCount: 1,
                    orderByFields: [{
                        field: "nombre_medicion",
                        order: "asc"
                    }]
                },
            ]
        }
    })
    map.tables.add(tabla_especies_abejas);

    const trampaplato = new FeatureLayer({
        title: "Trampa Plato",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/7",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{parcela_id}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "habitat_eunis_1",
                    visible: true,
                    label: "Hábitat EUNIS 1"
                },
                {
                    fieldName: "por_habitat_eunis_1",
                    visible: true,
                    label: "% presencia Habitat EUNIS 1"
                },
                {
                    fieldName: "habitat_eunis_2",
                    visible: true,
                    label: "Hábitat EUNIS 2"
                },
                {
                    fieldName: "por_habitat_eunis_2",
                    visible: true,
                    label: "% presencia Habitat EUNIS 2"
                },
                {
                    fieldName: "observaciones",
                    visible: true,
                    label: "Observaciones"
                },
                {
                    fieldName: "ccaa",
                    visible: true,
                    label: "Comunidad Autónoma"
                },
                {
                    fieldName: "provincia",
                    visible: true,
                    label: "Provincia"
                },
                {
                    fieldName: "ambientetxt",
                    visible: true,
                    label: "Ambiente"
                },
                {
                    fieldName: "usuario",
                    visible: true,
                    label: "Usuario"
                },
                {
                    fieldName: "rangovisitas",
                    visible: true,
                    label: "Rango Visitas"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 3,
                    title: "Parcela de muestreo",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_poligono",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 2,
                    title: "Número visita Trampa Plato",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.layers.add(trampaplato, 3);

    const tabla_visita_trampa_plato = new FeatureLayer({
        title: "Número visita Trampa Plato",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/19",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_visita}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_visita",
                    visible: true,
                    label: "Fecha visita",
                },
                {
                    fieldName: "nombre_trampa_plato",
                    visible: true,
                    label: "Nombre Trampa Plato",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "perturbacion",
                    visible: true,
                    label: "Perturbación",
                },
                {
                    fieldName: "perturbacion_descripcion",
                    visible: true,
                    label: "Descripción de la perturbación",
                },
                {
                    fieldName: "fecha_hora_inicio",
                    visible: true,
                    label: "Fecha y Hora inicio",
                },
                {
                    fieldName: "nubes_ini",
                    visible: true,
                    label: "Nubosidad al inicio del muestreo",
                },
                {
                    fieldName: "viento_ini",
                    visible: true,
                    label: "Dirección del viento al inicio del muestreo",
                },
                {
                    fieldName: "viento_beaufort_ini",
                    visible: true,
                    label: "Viento beaufort al inicio del muestreo",
                },
                {
                    fieldName: "temp_ini",
                    visible: true,
                    label: "Temperatura al inicio del muestreo",
                },
                {
                    fieldName: "fecha_hora_fin",
                    visible: true,
                    label: "Fecha y Hora final",
                },
                {
                    fieldName: "nubes_fin",
                    visible: true,
                    label: "Nubosidad al final del muestreo",
                },
                {
                    fieldName: "viento_fin",
                    visible: true,
                    label: "Dirección del viento al final del muestreo",
                },
                {
                    fieldName: "viento_beaufort_fin",
                    visible: true,
                    label: "Viento beaufort al final del muestreo",
                },
                {
                    fieldName: "temp_fin",
                    visible: true,
                    label: "Temperatura al final del muestreo",
                },
                {
                    fieldName: "por_exposicion_sol",
                    visible: true,
                    label: "Sol (% exposición)",
                },
                {
                    fieldName: "id_tecnico_1",
                    visible: true,
                    label: "Identificación tecnico de campo 1",
                },
                {
                    fieldName: "id_tecnico_2",
                    visible: true,
                    label: "Identificación tecnico de campo 2",
                },
                {
                    fieldName: "id_tecnico_3",
                    visible: true,
                    label: "Identificación tecnico de campo 3",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 2,
                    title: "Trampa plato",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_trampaplato",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 22,
                    title: "Observación Flora Trampa plato",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 21,
                    title: "Técnico gabinete",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_tecnico_gab",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_visita_trampa_plato);

    const tabla_trampa_plato_flora = new FeatureLayer({
        title: "Observación Flora Trampas Plato",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/22",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "taxones_flora",
                    visible: true,
                    label: "Taxón de flora observado",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "otros_taxones_flora",
                    visible: true,
                    label: "Taxón de flora",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 22,
                    title: "Número visita trampa plato",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_plato_flora);

    const tabla_trampa_plato_tecnico = new FeatureLayer({
        title: "Identificación técnico de gabinete",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/29",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_tecnico_gab}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "id_tecnico_gab",
                    visible: true,
                    label: "Identificación técnico de gabinete",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 21,
                    title: "Número visita trampa plato",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 7,
                    title: "Identificación trampa plato gabinete",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_specimen",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_plato_tecnico);

    const tabla_trampa_plato_identificacion_tecnico = new FeatureLayer({
        title: "Identificación trampa plato en gabinete",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/11",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{ID_specimen}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "Familia_abejas",
                    visible: true,
                    label: "Familia de abejas",
                },
                {
                    fieldName: "Familia_mariposas",
                    visible: true,
                    label: "Familia de mariposas",
                },
                {
                    fieldName: "Familia_sirfidos_default",
                    visible: true,
                    label: "Familia de sirfidos"
                },
                {
                    fieldName: "taxon_gen_abejas",
                    visible: true,
                    label: "Taxón o género de abeja",
                },
                {
                    fieldName: "taxon_gen_mariposas",
                    visible: true,
                    label: "Taxón o género de mariposas",
                },
                {
                    fieldName: "taxon_gen_sirfido",
                    visible: true,
                    label: "Taxón o género de sirfido"
                },
                {
                    fieldName: "Sexo",
                    visible: true,
                    label: "Sexo de especimen",
                },
                {
                    fieldName: "Det",
                    visible: true,
                    label: "DET",
                },
                {
                    fieldName: "Especie_nueva",
                    visible: true,
                    label: "Especie nueva"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 7,
                    title: "Técnico gabinete",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_tecnico_gab",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_plato_identificacion_tecnico);

    const trampaluz = new FeatureLayer({
        title: "Trampa Luz",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/6",
        minScale: 50000000,
        maxScale: 0,
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{parcela_id}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "habitat_eunis_1",
                    visible: true,
                    label: "Hábitat EUNIS 1"
                },
                {
                    fieldName: "por_habitat_eunis_1",
                    visible: true,
                    label: "% presencia Habitat EUNIS 1"
                },
                {
                    fieldName: "habitat_eunis_2",
                    visible: true,
                    label: "Hábitat EUNIS 2"
                },
                {
                    fieldName: "por_habitat_eunis_2",
                    visible: true,
                    label: "% presencia Habitat EUNIS 2"
                },
                {
                    fieldName: "observaciones",
                    visible: true,
                    label: "Observaciones"
                },
                {
                    fieldName: "ccaa",
                    visible: true,
                    label: "Comunidad Autónoma"
                },
                {
                    fieldName: "provincia",
                    visible: true,
                    label: "Provincia"
                },
                {
                    fieldName: "ambientetxt",
                    visible: true,
                    label: "Ambiente"
                },
                {
                    fieldName: "usuario",
                    visible: true,
                    label: "Usuario"
                },
                {
                    fieldName: "rangovisitas",
                    visible: true,
                    label: "Rango Visitas"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 1,
                    title: "Parcela de muestreo",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_poligono",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 0,
                    title: "Número visita Trampa Luz",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.layers.add(trampaluz, 4);

    const tabla_visita_trampa_luz = new FeatureLayer({
        title: "Número visita Trampa Luz",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/17",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_visita}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "fecha_visita",
                    visible: true,
                    label: "Fecha de la visita",
                },
                {
                    fieldName: "nombre_trampa_luz",
                    visible: true,
                    label: "nombre_trampa_luz",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia"
                },
                {
                    fieldName: "perturbacion",
                    visible: true,
                    label: "Perturbacion",
                },
                {
                    fieldName: "perturbacion_descripcion",
                    visible: true,
                    label: "Descripción de la perturbación"
                },
                {
                    fieldName: "fecha_hora_inicio",
                    visible: true,
                    label: "Fecha y Hora inicio",
                },
                {
                    fieldName: "nubes_ini",
                    visible: true,
                    label: "Nubosidad al inicio del muestreo",
                },
                {
                    fieldName: "viento_ini",
                    visible: true,
                    label: "Dirección del viento al inicio del muestreo",
                },
                {
                    fieldName: "viento_beaufort_ini",
                    visible: true,
                    label: "Viento beaufort al inicio del muestreo",
                },
                {
                    fieldName: "temp_ini",
                    visible: true,
                    label: "Temperatura al inicio del muestreo",
                },
                {
                    fieldName: "fecha_hora_fin",
                    visible: true,
                    label: "Fecha y Hora final",
                },
                {
                    fieldName: "nubes_fin",
                    visible: true,
                    label: "Nubosidad al final del muestreo",
                },
                {
                    fieldName: "viento_fin",
                    visible: true,
                    label: "Dirección del viento al final del muestreo",
                },
                {
                    fieldName: "viento_beaufort_fin",
                    visible: true,
                    label: "Viento beaufort al final del muestreo",
                },
                {
                    fieldName: "temp_fin",
                    visible: true,
                    label: "Temperatura al final del muestreo",
                },
                {
                    fieldName: "por_exposicion_sol",
                    visible: true,
                    label: "Sol (% exposición)",
                },
                {
                    fieldName: "id_tecnico_1",
                    visible: true,
                    label: "Identificación tecnico de campo 1",
                },
                {
                    fieldName: "id_tecnico_2",
                    visible: true,
                    label: "Identificación tecnico de campo 2",
                },
                {
                    fieldName: "id_tecnico_3",
                    visible: true,
                    label: "Identificación tecnico de campo 3",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 0,
                    title: "Trampa luz",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_trampaluz",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 19,
                    title: "Técnico gabinete",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_tecnico_gab",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 17,
                    title: "Observación tramo luz fuera",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 16,
                    title: "Observación tramo luz dentro",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 18,
                    title: "Trampa Luz Flora",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_observacion",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_visita_trampa_luz);

    const tabla_trampa_luz_flora = new FeatureLayer({
        title: "Observación Flora Trampa Luz",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/21",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "taxones_flora",
                    visible: true,
                    label: "Taxón de flora observado",
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia",
                },
                {
                    fieldName: "otros_taxones_flora",
                    visible: true,
                    label: "Taxón de flora",
                }
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 18,
                    title: "Número visita Trampa luz",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_luz_flora);

    const tabla_observacion_trampa_luz_dentro = new FeatureLayer({
        title: "Observación taxones interior trampa",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/25",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "taxon_polillas",
                    visible: true,
                    label: "Taxón observado",
                },
                {
                    fieldName: "numero_ejemplares",
                    visible: true,
                    label: "Número de ejemplares observados",
                },
                {
                    fieldName: "taxon_no_identificado",
                    visible: true,
                    label: "Referencia taxón NO identificado"
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 16,
                    title: "Número visita Trampa luz",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_observacion_trampa_luz_dentro);

    const tabla_observacion_trampa_luz_fuera = new FeatureLayer({
        title: "Observación taxones exterior trampa",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/24",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_observacion}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "taxon_polillas",
                    visible: true,
                    label: "Taxón observado",
                },
                {
                    fieldName: "numero_ejemplares",
                    visible: true,
                    label: "Número de ejemplares observados",
                },
                {
                    fieldName: "taxon_no_identificado",
                    visible: true,
                    label: "Referencia taxón NO identificado"
                },
                {
                    fieldName: "cod_ocurrencia",
                    visible: true,
                    label: "Código Ocurrencia"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 17,
                    title: "Número visita Trampa luz",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_observacion_trampa_luz_fuera);

    const tabla_trampa_luz_tecnico = new FeatureLayer({
        title: "Identificación técnico de gabinete",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/28",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_tecnico_gab}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "id-tecnico_gab",
                    visible: true,
                    label: "Identificación técnico de gabinete",
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 19,
                    title: "Número visita Trampa luz",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_visita",
                        order: "asc"
                    }]
                },
                {
                    type: "relationship",
                    relationshipId: 6,
                    title: "Identificación trampa luz gabinete",
                    displayCount: 0,
                    orderByFields: [{
                        field: "id_specimen",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_luz_tecnico);

    const tabla_trampa_luz_identificacion_tecnico = new FeatureLayer({
        title: "Identificación trampa luz en gabinete",
        url: "https://services1.arcgis.com/NEtTcrdz0tnwKxRQ/arcgis/rest/services/polinizadores/FeatureServer/10",
        outFields: ["*"],
        definitionExpression: "1=1",
        popupTemplate: {
            title: "{id_specimen}",
            outFields: ["*"],
            lastEditInfoEnabled: false,
            fieldInfos: [
                {
                    fieldName: "familia_abejas",
                    visible: true,
                    label: "Familia de abejas",
                },
                {
                    fieldName: "familia_mariposas",
                    visible: true,
                    label: "Familia de mariposas",
                },
                {
                    fieldName: "familia_sirfidos",
                    visible: true,
                    label: "Familia de sírfidos"
                },
                {
                    fieldName: "taxon_gen_abejas",
                    visible: true,
                    label: "Taxón o género de abeja",
                },
                {
                    fieldName: "taxon_gen_mariposas",
                    visible: true,
                    label: "Taxón o género de mariposas",
                },
                {
                    fieldName: "taxon_gen_sirfido",
                    visible: true,
                    label: "Taxón o género de sirfido"
                },
                {
                    fieldName: "Sexo",
                    visible: true,
                    label: "Sexo de especimen",
                },
                {
                    fieldName: "Det",
                    visible: true,
                    label: "DET",
                },
                {
                    fieldName: "Especie_nueva",
                    visible: true,
                    label: "Especie nueva"
                },
            ],
            content: [
                {
                    type: "fields",
                },
                {
                    type: "relationship",
                    relationshipId: 6,
                    title: "Técnico gabinete",
                    displayCount: 1,
                    orderByFields: [{
                        field: "id_tecnico_gab",
                        order: "asc"
                    }]
                }
            ]
        }
    })
    map.tables.add(tabla_trampa_luz_identificacion_tecnico);

    fetchDatos(parcelas, 'ccaa', 'ccaa', 'Todas las Comunidades Autónomas');
    fetchDatos(parcelas, 'provincia', 'provincia', 'Todas las Provincias');
    fetchDatos(parcelas, 'ambientetxt', 'ambientetxt', 'Todos los Ambientes');
    fetchDatos(parcelas, 'usuario', 'usuario', 'Todos los Usuarios');
    fetchDatos(parcelas, 'rangovisitas', 'rangovisitas', 'Todas las Visitas');
    const ccaa = $("#ccaa").val();
    const provincia = $("#provincia").val();
    const ambientetxt = $("#ambientetxt").val();
    const usuario = $("#usuario").val();
    const visitas = $("#rangovisitas").val();
    realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
    realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
    realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);

    $('#ccaa').on('change', async () => {
        // Selector de Provincia
        const queryprovincia = await parcelas.createQuery();
        queryprovincia.returnDistinctValues = true;

        const ccaa = $("#ccaa").val();
        queryTablas(queryprovincia, ccaa, "undefined", "undefined", "undefined", "undefined");

        queryprovincia.outFields = ['provincia'];
        queryprovincia.orderByFields = ['provincia'];
        queryprovincia.returnGeometry = false;
        queryprovincia.maxRecordCountFactor = 5;

        const flQuery = await parcelas.queryFeatures(queryprovincia);
        const features = await flQuery.features;

        $("#provincia option").remove();
        if (features.length != 1) {
            $("#provincia").append('<option value="todas">Todas las Provincias</option>');
        }

        await features.map(feature => {
            const { provincia } = feature.attributes;
            $("#provincia").append('<option value="' + provincia + '">' + provincia + '</option>');
        });

        // Selector de ambientetxt
        const queryambientetxt = await parcelas.createQuery();
        queryambientetxt.returnDistinctValues = true;

        const provincia = $("#provincia").val();
        queryTablas(queryambientetxt, ccaa, provincia, "undefined", "undefined", "undefined");

        queryambientetxt.outFields = ['ambientetxt'];
        queryambientetxt.orderByFields = ['ambientetxt'];
        queryambientetxt.returnGeometry = false;
        queryambientetxt.maxRecordCountFactor = 5;

        const flQueryambientetxt = await parcelas.queryFeatures(queryambientetxt);
        const featuresambientetxt = await flQueryambientetxt.features;

        $("#ambientetxt option").remove();
        if (featuresambientetxt.length != 1) {
            $("#ambientetxt").append('<option value="todas">Todos los ambientes</option>');
        }

        await featuresambientetxt.map(feature => {
            const { ambientetxt } = feature.attributes;
            $("#ambientetxt").append('<option value="' + ambientetxt + '">' + ambientetxt + '</option>');
        });

        // Selector de Usuario
        const queryUsuario = await parcelas.createQuery();
        queryUsuario.returnDistinctValues = true;

        const ambientetxt = $("#ambientetxt").val();
        queryTablas(queryUsuario, ccaa, provincia, ambientetxt, "undefined", "undefined");

        queryUsuario.outFields = ['usuario'];
        queryUsuario.orderByFields = ['usuario'];
        queryUsuario.returnGeometry = false;
        queryUsuario.maxRecordCountFactor = 5;

        const flQueryUsuario = await parcelas.queryFeatures(queryUsuario);
        const featuresUsuario = await flQueryUsuario.features;

        $("#usuario option").remove();
        if (featuresUsuario.length != 1) {
            $("#usuario").append('<option value="todas">Todos los Usuarios</option>');
        }

        await featuresUsuario.map(feature => {
            const { usuario } = feature.attributes;
            $("#usuario").append('<option value="' + usuario + '">' + usuario + '</option>');
        });

        // Selector de Visitas
        const queryVisitas = await parcelas.createQuery();
        queryVisitas.returnDistinctValues = true;

        const usuario = $("#usuario").val();
        queryTablas(queryVisitas, ccaa, provincia, ambientetxt, usuario, "undefined");

        queryVisitas.outFields = ['rangovisitas'];
        queryVisitas.orderByFields = ['rangovisitas'];
        queryVisitas.returnGeometry = false;
        queryVisitas.maxRecordCountFactor = 5;

        const flQueryVisitas = await parcelas.queryFeatures(queryVisitas);
        const featuresVisitas = await flQueryVisitas.features;

        $("#rangovisitas option").remove();
        if (featuresVisitas.length != 1) {
            $("#rangovisitas").append('<option value="todas">Todas las Visitas</option>');
        }

        await featuresVisitas.map(feature => {
            const { rangovisitas } = feature.attributes;
            $("#rangovisitas").append('<option value="' + rangovisitas + '">' + rangovisitas + '</option>');
        });

        $("#ccaa option[value='" + ccaa + "']").prop("selected", true);

        /*************************** Filtrar las capas al seleccionar una CCAA ***********************************/
        const visitas = $("#rangovisitas").val();
        queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    });

    $('#provincia').on('change', async () => {
        // Selector de ambientetxt
        const queryambientetxt = await parcelas.createQuery();
        queryambientetxt.returnDistinctValues = true;

        const ccaa = $("#ccaa").val();
        const provincia = $("#provincia").val();
        queryTablas(queryambientetxt, ccaa, provincia, "undefined", "undefined", "undefined");

        queryambientetxt.outFields = ['ambientetxt'];
        queryambientetxt.orderByFields = ['ambientetxt'];
        queryambientetxt.returnGeometry = false;
        queryambientetxt.maxRecordCountFactor = 5;

        const flQueryambientetxt = await parcelas.queryFeatures(queryambientetxt);
        const featuresambientetxt = await flQueryambientetxt.features;

        $("#ambientetxt option").remove();
        if (featuresambientetxt.length != 1) {
            $("#ambientetxt").append('<option value="todas">Todos los ambientes</option>');
        }

        await featuresambientetxt.map(feature => {
            const { ambientetxt } = feature.attributes;
            $("#ambientetxt").append('<option value="' + ambientetxt + '">' + ambientetxt + '</option>');
        });

        // Selector de Usuario
        const queryUsuario = await parcelas.createQuery();
        queryUsuario.returnDistinctValues = true;

        const ambientetxt = $("#ambientetxt").val();
        queryTablas(queryUsuario, ccaa, provincia, ambientetxt, "undefined", "undefined");

        queryUsuario.outFields = ['usuario'];
        queryUsuario.orderByFields = ['usuario'];
        queryUsuario.returnGeometry = false;
        queryUsuario.maxRecordCountFactor = 5;

        const flQueryUsuario = await parcelas.queryFeatures(queryUsuario);
        const featuresUsuario = await flQueryUsuario.features;

        $("#usuario option").remove();
        if (featuresUsuario.length != 1) {
            $("#usuario").append('<option value="todas">Todos los Usuarios</option>');
        }

        await featuresUsuario.map(feature => {
            const { usuario } = feature.attributes;
            $("#usuario").append('<option value="' + usuario + '">' + usuario + '</option>');
        });

        // Selector de Visitas
        const queryVisitas = await parcelas.createQuery();
        queryVisitas.returnDistinctValues = true;

        const usuario = $("#usuario").val();
        queryTablas(queryVisitas, ccaa, provincia, ambientetxt, usuario, "undefined");

        queryVisitas.outFields = ['rangovisitas'];
        queryVisitas.orderByFields = ['rangovisitas'];
        queryVisitas.returnGeometry = false;
        queryVisitas.maxRecordCountFactor = 5;

        const flQueryVisitas = await parcelas.queryFeatures(queryVisitas);
        const featuresVisitas = await flQueryVisitas.features;

        $("#rangovisitas option").remove();
        if (featuresVisitas.length != 1) {
            $("#rangovisitas").append('<option value="todas">Todas las Visitas</option>');
        }

        await featuresVisitas.map(feature => {
            const { rangovisitas } = feature.attributes;
            $("#rangovisitas").append('<option value="' + rangovisitas + '">' + rangovisitas + '</option>');
        });

        $("#provincia option[value='" + provincia + "']").prop("selected", true);

        /*************************** Filtrar las capas al seleccionar una PROVINCIA ***********************************/
        const visitas = $("#rangovisitas").val();
        queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    });

    $('#ambientetxt').on('change', async () => {
        // Selector de Usuario
        const queryUsuario = await parcelas.createQuery();
        queryUsuario.returnDistinctValues = true;

        const ccaa = $("#ccaa").val();
        const provincia = $("#provincia").val();
        const ambientetxt = $("#ambientetxt").val();

        queryTablas(queryUsuario, ccaa, provincia, ambientetxt, "undefined", "undefined");

        queryUsuario.outFields = ['usuario'];
        queryUsuario.orderByFields = ['usuario'];
        queryUsuario.returnGeometry = false;
        queryUsuario.maxRecordCountFactor = 5;

        const flQueryUsuario = await parcelas.queryFeatures(queryUsuario);
        const featuresUsuario = await flQueryUsuario.features;

        $("#usuario option").remove();
        if (featuresUsuario.length != 1) {
            $("#usuario").append('<option value="todas">Todos los Usuarios</option>');
        }

        await featuresUsuario.map(feature => {
            const { usuario } = feature.attributes;
            $("#usuario").append('<option value="' + usuario + '">' + usuario + '</option>');
        });

        // Selector de Visitas
        const queryVisitas = await parcelas.createQuery();
        queryVisitas.returnDistinctValues = true;

        const usuario = $("#usuario").val();
        queryTablas(queryVisitas, ccaa, provincia, ambientetxt, usuario, "undefined");

        queryVisitas.outFields = ['rangovisitas'];
        queryVisitas.orderByFields = ['rangovisitas'];
        queryVisitas.returnGeometry = false;
        queryVisitas.maxRecordCountFactor = 5;

        const flQueryVisitas = await parcelas.queryFeatures(queryVisitas);
        const featuresVisitas = await flQueryVisitas.features;

        $("#rangovisitas option").remove();
        if (featuresVisitas.length != 1) {
            $("#rangovisitas").append('<option value="todas">Todas las Visitas</option>');
        }

        await featuresVisitas.map(feature => {
            const { rangovisitas } = feature.attributes;
            $("#rangovisitas").append('<option value="' + rangovisitas + '">' + rangovisitas + '</option>');
        });

        $("#ambientetxt option[value='" + ambientetxt + "']").prop("selected", true);

        /*************************** Filtrar las capas al seleccionar un AMBIENTE ***********************************/
        const visitas = $("#rangovisitas").val();
        queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    });

    $('#usuario').on('change', async () => {
        // Selector de Visitas
        const queryVisitas = await parcelas.createQuery();
        queryVisitas.returnDistinctValues = true;

        const ccaa = $("#ccaa").val();
        const provincia = $("#provincia").val();
        const ambientetxt = $("#ambientetxt").val();
        const usuario = $("#usuario").val();

        queryTablas(queryVisitas, ccaa, provincia, ambientetxt, usuario, "undefined");

        queryVisitas.outFields = ['rangovisitas'];
        queryVisitas.orderByFields = ['rangovisitas'];
        queryVisitas.returnGeometry = false;
        queryVisitas.maxRecordCountFactor = 5;

        const flQueryVisitas = await parcelas.queryFeatures(queryVisitas);
        const featuresVisitas = await flQueryVisitas.features;

        $("#rangovisitas option").remove();
        if (featuresVisitas.length != 1) {
            $("#rangovisitas").append('<option value="todas">Todas las Visitas</option>');
        }

        await featuresVisitas.map(feature => {
            const { rangovisitas } = feature.attributes;
            $("#rangovisitas").append('<option value="' + rangovisitas + '">' + rangovisitas + '</option>');
        });

        $("#usuario option[value='" + usuario + "']").prop("selected", true);

        /*************************** Filtrar las capas al seleccionar un USUARIO ***********************************/
        const visitas = $("#rangovisitas").val();
        queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    });

    $('#rangovisitas').on('change', async () => {
        /*************************** Filtrar las capas al seleccionar un USUARIO ***********************************/
        const ccaa = $("#ccaa").val();
        const provincia = $("#provincia").val();
        const ambientetxt = $("#ambientetxt").val();
        const usuario = $("#usuario").val();
        const visitas = $("#rangovisitas").val();
        queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    })


    const searchWidget = new Search({
        view: view,
        allPlaceholder: "Parcela de muestreo",
        includeDefaultSources: false,
        popupEnabled: false,
        locationEnabled: false,
        sources: [
            {
                layer: parcelas,
                searchFields: ["parcela_id"],
                displayField: "parcela_id",
                exactMatch: false,
                outFields: ["parcela_id"],
                name: "Parcelas de muestreo",
                placeholder: "Buscar parcela de muestreo",
                maxResults: 10,
                maxSuggestions: 10,
                suggestionsEnabled: true,
                minSuggestCharacters: 0,
            }
            // {
            //     name: "ArcGIS World Geocoding Service",
            //     placeholder: "ejemplo: Julian Camarillo, Madrid",
            //     apiKey: "AAPK8f2d9bab645a47b390d65cce820b967eME-4OJqZvSgzWly-xTgwlM19ATqUv4oLTEg-J9pV2DvirHOeNrz4PuDxYQSYNEYM",
            //     singleLineFieldName: "SingleLine",
            //     url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
            // }
        ]
    });

    //Add the search widget to the top right corner of the view
    view.ui.add(searchWidget, {
        position: "top-right"
    });

    $('#boton').on('click', async () => {
        $("#button").prop('disabled', true);
        const ccaa = "todas";
        const provincia = "todas";
        const ambientetxt = "todas";
        const usuario = "todas";
        const visitas = "todas";
        await fetchDatos(parcelas, 'ccaa', 'ccaa', 'Todas las Comunidades Autónomas');
        await fetchDatos(parcelas, 'provincia', 'provincia', 'Todas las Provincias');
        await fetchDatos(parcelas, 'ambientetxt', 'ambientetxt', 'Todos los Ambientes');
        await fetchDatos(parcelas, 'usuario', 'usuario', 'Todos los Usuarios');
        await fetchDatos(parcelas, 'rangovisitas', 'rangovisitas', 'Todas las Visitas');
        await queryLayers(ccaa, provincia, ambientetxt, usuario, visitas);
        await realizarGrafico(ccaa, provincia, ambientetxt, usuario, visitas);
        await realizarIndicadorUno(ccaa, provincia, ambientetxt, usuario, visitas);
        await realizarIndicadorDos(ccaa, provincia, ambientetxt, usuario, visitas);
    })


    /***************************************************** FUNCIONES *************************************************************************************/

    //Función para traer los datos de las tablas de las capas y rellenar los selectores
    async function fetchDatos(layer, filtro, campo, texto) {
        const query = await layer.createQuery();
        query.returnDistinctValues = true;
        const filtroValor = $("#" + filtro).val();
        query.where = "1=1";
        query.outFields = ['"' + campo + '"'];
        query.orderByFields = ['"' + campo + '"'];
        query.returnGeometry = false;
        query.maxRecordCountFactor = 5;

        const flQuery = await layer.queryFeatures(query);
        const features = await flQuery.features;

        $("#" + campo + " option").remove();
        if (features.length != 1) {
            $("#" + campo).append('<option value="todas">' + texto + '</option>');
        }

        await features.map(feature => {
            const { [campo]: valor } = feature.attributes;
            $("#" + campo).append('<option value="' + valor + '">' + valor + '</option>');
            seleccionada = valor;
        });

        // $("#" + filtro + " option[value='" + filtroValor + "']").prop("selected", true);
        $("#" + filtro + " option[value='todas']").prop("selected", true);
    }

    //Función para hacer zoom sobre los elementos geográficos seleccionados en los filtros
    async function setFeatureLayerZoom(layer) {
        const queryExtent = await layer.queryExtent();
        view.goTo({ target: queryExtent.extent.expand(1.50) }, { duration: 1500 })
    }

    // Función para filtrar las capas despues de seleccionar una opción en los filtros
    const queryLayers = async (autonomia, provincia, ambientetxt, usuario, rangovisitas) => {
        const lista = []

        lista.push("ccaa = '" + autonomia + "'")
        lista.push("provincia = '" + provincia + "'")
        lista.push("ambientetxt = '" + ambientetxt + "'")
        lista.push("usuario = '" + usuario + "'")
        lista.push("rangovisitas = '" + rangovisitas + "'")

        const result = lista.filter((word) => !word.includes('todas'));

        if (result.length == 0) {
            $("#button").prop('disabled', true);
            parcelas.definitionExpression = "1=1";
            subtransecto.definitionExpression = "1=1";
            trampaplato.definitionExpression = "1=1";
            trampaluz.definitionExpression = "1=1";
            await setFeatureLayerZoom(parcelas);
        } else if (result.length == 1) {
            $("#button").prop('disabled', false);
            const query = result[0]
            parcelas.definitionExpression = query;
            subtransecto.definitionExpression = query;
            trampaplato.definitionExpression = query;
            trampaluz.definitionExpression = query;
            await setFeatureLayerZoom(parcelas);
        } else if (result.length == 2) {
            $("#button").prop('disabled', false);
            const query1 = result[0]
            const query2 = result[1]
            const query = query1 + ' AND ' + query2
            parcelas.definitionExpression = query;
            subtransecto.definitionExpression = query;
            trampaplato.definitionExpression = query;
            trampaluz.definitionExpression = query;
            await setFeatureLayerZoom(parcelas);
        } else if (result.length == 3) {
            $("#button").prop('disabled', false);
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3
            parcelas.definitionExpression = query;
            subtransecto.definitionExpression = query;
            trampaplato.definitionExpression = query;
            trampaluz.definitionExpression = query;
            await setFeatureLayerZoom(parcelas);
        } else if (result.length == 4) {
            $("#button").prop('disabled', false);
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4
            parcelas.definitionExpression = query;
            subtransecto.definitionExpression = query;
            trampaplato.definitionExpression = query;
            trampaluz.definitionExpression = query;
            await setFeatureLayerZoom(parcelas);
        } else if (result.length == 5) {
            $("#button").prop('disabled', false);
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const query5 = result[4]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4 + ' AND ' + query5
            parcelas.definitionExpression = query;
            subtransecto.definitionExpression = query;
            trampaplato.definitionExpression = query;
            trampaluz.definitionExpression = query;
            setFeatureLayerZoom(parcelas);
        } else {
            $("#button").prop('disabled', true);
            parcelas.definitionExpression = "1=1";
            subtransecto.definitionExpression = "1=1";
            trampaplato.definitionExpression = "1=1";
            trampaluz.definitionExpression = "1=1";
            await setFeatureLayerZoom(parcelas);
        }
    }

    // Función para filtrar las tablas para rellenar los seleccionables
    const queryTablas = (pregunta, autonomia, provincia, ambientetxt, usuario, rangovisitas) => {
        const lista = []

        lista.push("ccaa = '" + autonomia + "'")
        lista.push("provincia = '" + provincia + "'")
        lista.push("ambientetxt = '" + ambientetxt + "'")
        lista.push("usuario = '" + usuario + "'")
        lista.push("rangovisitas = '" + rangovisitas + "'")

        const resultado = lista.filter((word) => !word.includes('todas'));
        const result = resultado.filter((word) => !word.includes('undefined'));

        if (result.length == 0) {
            pregunta.where = "1=1";
        } else if (result.length == 1) {
            const query = result[0]
            pregunta.where = query;
        } else if (result.length == 2) {
            const query1 = result[0]
            const query2 = result[1]
            const query = query1 + ' AND ' + query2
            pregunta.where = query;
        } else if (result.length == 3) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3
            pregunta.where = query;
        } else if (result.length == 4) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4
            pregunta.where = query;
        } else if (result.length == 5) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const query5 = result[4]
            const query = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4 + ' AND ' + query5
            pregunta.where = query;
        } else {
            pregunta.where = "1=1";
        }
    }

    async function fetchDatosGrafico(tabla, autonomia, provincia, ambientetxt, usuario, rangovisitas, campo) {

        const lista = []

        lista.push("ccaa = '" + autonomia + "'")
        lista.push("provincia = '" + provincia + "'")
        lista.push("ambientetxt = '" + ambientetxt + "'")
        lista.push("usuario = '" + usuario + "'")
        lista.push("rangovisitas = '" + rangovisitas + "'")

        const resultado = lista.filter((word) => !word.includes('todas'));
        const result = resultado.filter((word) => !word.includes('undefined'));
        const query = await tabla.createQuery();
        //query.returnDistinctValues = true;

        if (result.length == 0) {
            query.where = "1=1";
        } else if (result.length == 1) {
            const pregunta = result[0]
            query.where = pregunta;
        } else if (result.length == 2) {
            const query1 = result[0]
            const query2 = result[1]
            const pregunta = query1 + ' AND ' + query2
            query.where = pregunta;
        } else if (result.length == 3) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const pregunta = query1 + ' AND ' + query2 + ' AND ' + query3
            query.where = pregunta;
        } else if (result.length == 4) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const pregunta = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4
            query.where = pregunta;
        } else if (result.length == 5) {
            const query1 = result[0]
            const query2 = result[1]
            const query3 = result[2]
            const query4 = result[3]
            const query5 = result[4]
            const pregunta = query1 + ' AND ' + query2 + ' AND ' + query3 + ' AND ' + query4 + ' AND ' + query5
            query.where = pregunta;
        } else {
            query.where = "1=1";
        }

        query.outFields = [campo];
        query.orderByFields = [campo];
        query.returnGeometry = false;
        query.maxRecordCountFactor = 5;

        const flQuery = await tabla.queryFeatures(query);
        const features = await flQuery.features;
        return features
    }

    async function realizarIndicadorUno(autonomia, provincia, ambientetxt, usuario, rangovisitas) {

        const feature_mariposas = await fetchDatosGrafico(tabla_especies_mariposas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_mariposas");
        const feature_sirfidos = await fetchDatosGrafico(tabla_especies_sirfidos, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_sirfidos");
        const feature_abejas = await fetchDatosGrafico(tabla_especies_abejas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_abejas");

        const mariposas = feature_mariposas.length;
        const sirfidos = feature_sirfidos.length;
        const abejas = feature_abejas.length;

        const total = mariposas + sirfidos + abejas;
        // console.log(total);
        const div = document.getElementById('indicador-uno');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.innerHTML += '<p class="titulo">Número de ejemplares</p>';
        div.innerHTML += '<p class="valor">' + total + '</p>';
    }

    async function realizarIndicadorDos(autonomia, provincia, ambientetxt, usuario, rangovisitas) {

        const feature_mariposas = await fetchDatosGrafico(tabla_especies_mariposas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_mariposas");
        const feature_sirfidos = await fetchDatosGrafico(tabla_especies_sirfidos, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_sirfidos");
        const feature_abejas = await fetchDatosGrafico(tabla_especies_abejas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_abejas");

        const groupBytaxonMariposas = Object.groupBy(feature_mariposas, taxon => {
            const taxonAgrupado = taxon.attributes.taxon_mariposas;
            return taxonAgrupado;
        });

        let contadorMariposas = 0;
        for (const [key, value] of Object.entries(groupBytaxonMariposas)) {
            const llave = `${key}`
            if (llave != 'null') {
                contadorMariposas++
            }
        }

        const groupBytaxonSirfidos = Object.groupBy(feature_sirfidos, taxon => {
            const taxonAgrupado = taxon.attributes.taxon_sirfidos;
            return taxonAgrupado;
        });

        let contadorSirfidos = 0;
        for (const [key, value] of Object.entries(groupBytaxonSirfidos)) {
            const llave = `${key}`
            if (llave != 'null') {
                contadorSirfidos++
            }
        }

        const groupBytaxonAbejas = Object.groupBy(feature_abejas, taxon => {
            const taxonAgrupado = taxon.attributes.taxon_abejas;
            return taxonAgrupado;
        });

        let contadorAbejas = 0;
        for (const [key, value] of Object.entries(groupBytaxonAbejas)) {
            const llave = `${key}`
            if (llave != 'null') {
                contadorAbejas++
            }
        }

        const total = contadorMariposas + contadorSirfidos + contadorAbejas;
        // console.log(total);
        const div = document.getElementById('indicador-dos');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.innerHTML += '<p class="titulo">Número de especies</p>';
        div.innerHTML += '<p class="valor">' + total + '</p>';
    }

    async function realizarGrafico(autonomia, provincia, ambientetxt, usuario, rangovisitas) {

        const feature_mariposas = await fetchDatosGrafico(tabla_especies_mariposas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_mariposas");
        const feature_sirfidos = await fetchDatosGrafico(tabla_especies_sirfidos, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_sirfidos");
        const feature_abejas = await fetchDatosGrafico(tabla_especies_abejas, autonomia, provincia, ambientetxt, usuario, rangovisitas, "taxon_abejas");

        const mariposas = feature_mariposas.length;
        const sirfidos = feature_sirfidos.length;
        const abejas = feature_abejas.length;

        const labels = ['Mariposas', 'Sírfidos', 'Abejas'];
        const data = [mariposas, sirfidos, abejas];

        const ctx = await document.getElementById('pie').getContext('2d');
        if (myChart) myChart.destroy();
        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    //label: 'Situación',
                    data: data,
                    backgroundColor: [
                        '#ffaa00',
                        '#ffff00',
                        '#aaff00',
                    ],
                    borderColor: [
                        '#F7F9F9',
                        '#F7F9F9',
                        '#F7F9F9',
                    ],
                    hoverOffset: 10,
                }]
            },
            options: {
                /*onClick: (event, elements, chart) => {
                    if (elements[0]) {
                        const i = elements[0].index;
                        console.log(chart.data.labels[i] + ': ' + chart.data.datasets[0].data[i]);
                    }
                },*/
                plugins: {
                    title: {
                        display: true,
                        text: 'Número de ejemplares por polinizador',
                        font: {
                            size: 13,
                            family: 'system-ui',
                            weight: 500
                        },
                        padding: 15
                    },
                    legend: {
                        display: false,
                        position: 'bottom',
                        align: 'chartArea',
                        maxWidth: 50,
                        labels: {
                            font: {
                                size: 12,
                                weight: 700,
                                family: 'system-ui',
                            },
                            color: '#222927'
                        }
                    },
                    tooltip: {
                        enabled: true,
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            return value + '%';
                        },
                    },
                }
            }
        });

        const celda_mariposas = document.getElementById('valor-mariposas');
        const celda_sirfidos = document.getElementById('valor-sirfidos');
        const celda_abejas = document.getElementById('valor-abejas');

        while (celda_mariposas.firstChild) {
            celda_mariposas.removeChild(celda_mariposas.firstChild);
        }

        while (celda_sirfidos.firstChild) {
            celda_sirfidos.removeChild(celda_sirfidos.firstChild);
        }

        while (celda_abejas.firstChild) {
            celda_abejas.removeChild(celda_abejas.firstChild);
        }

        celda_mariposas.innerHTML += mariposas;
        celda_sirfidos.innerHTML += sirfidos;
        celda_abejas.innerHTML += abejas;
    }

});