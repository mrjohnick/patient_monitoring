import React from "react";
import { View, Text, Button } from "react-native";
import colors from "../assets/colors/colors";
import XLSX from "xlsx";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {heartGraph, oxygenGraph, breathGraph} from "./Home";

const Export = () => {
  var room1 = [["Heart"],heartGraph,["Oxygen"],oxygenGraph,["Breath"],breathGraph];
  // Change data to room 2 data when created.
  var room2 = [["Heart"],heartGraph,["Oxygen"],oxygenGraph,["Breath"],breathGraph];
  const handleExport = async() => {
  var ws = XLSX.utils.aoa_to_sheet(room1);
  var ws2 = XLSX.utils.aoa_to_sheet(room2);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Room 1");
  XLSX.utils.book_append_sheet(wb, ws2, "Room 2");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'patients.xlsx';
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });
  
  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'MyWater data',
    UTI: 'com.microsoft.excel.xlsx'
  });
  };

  return (
    <View
      style={{ justifyContent: "flex-start", backgroundColor: colors.white2}}
    >
      <Text>Export</Text>

      <Button title="Export" onPress={handleExport}/>
    </View>
  );
};

export default Export;
