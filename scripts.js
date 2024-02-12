// reset all inputs on page refresh
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  window.location = window.location.href;
}

// set initial textarea height and add OnInput function
est_wbc_counts.setAttribute("style", "height:" + 
                              (parseInt(est_wbc_counts.scrollHeight)*2 + 3) + 
                              "px;overflow-y:hidden;resize:none;" +
                              "line-height: 120%;");
est_plt_counts.setAttribute("style", "height:" + 
                              (parseInt(est_plt_counts.scrollHeight)*2 + 3) + 
                              "px;overflow-y:hidden;resize:none;" +
                              "line-height: 120%;");
cell_counts.setAttribute("style", "height:" + 
                        (parseInt(cell_counts.scrollHeight)*3 + 3) + 
                        "px;overflow-y:hidden;resize:none;" +
                        "line-height: 120%;");
path_rev_comments
  .setAttribute("style", "height:" + 
                  (parseInt(path_rev_comments.scrollHeight)*3 + 3) + 
                  "px;overflow-y:hidden;resize:none;" +
                  "line-height: 120%;");
textarea_rbc_comments
  .setAttribute("style", "height:" + 
                  (parseInt(textarea_rbc_comments.scrollHeight)*2 + 3) + 
                  "px;overflow-y:hidden;resize:none;" +
                  "line-height: 120%;");
textarea_plt_comments
  .setAttribute("style", "height:" + 
                  (parseInt(textarea_plt_comments.scrollHeight)*2 + 3) + 
                  "px;overflow-y:hidden;resize:none;" +
                  "line-height: 120%;");
all_textareas = [est_wbc_counts,
                  est_plt_counts,
                  cell_counts,
                  path_rev_comments,
                  textarea_rbc_comments,
                  textarea_plt_comments];
all_textareas                  
  .forEach(elem => {
    elem.addEventListener("input", OnInput, false);
    elem.addEventListener("focus", cursor_at_end);
  });

orig_est_wbc_scrollHeight = est_wbc_counts.scrollHeight;
orig_est_plt_scrollHeight = est_plt_counts.scrollHeight;
orig_cc_scrollHeight = cell_counts.scrollHeight;
orig_rbc_morph_scrollHeight = textarea_rbc_comments.scrollHeight;
orig_plt_morph_scrollHeight = textarea_plt_comments.scrollHeight;

function OnInput(event) {
  update_letter_spacing(event.target);
  
  textarea_element = document.getElementById(event.target.id);
  
  if(textarea_element.id.includes("rbc")) {
    check_scrollHeight = orig_rbc_morph_scrollHeight;
  } else if(textarea_element.id.includes("plt")) {
    check_scrollHeight = orig_plt_morph_scrollHeight;
  } else if(textarea_element.id.includes("est_wbc")){
    check_scrollHeight = orig_est_wbc_scrollHeight;
  } else if(textarea_element.id.includes("est_plt")){
    check_scrollHeight = orig_est_wbc_scrollHeight;
  } else {
    check_scrollHeight = orig_cc_scrollHeight;
  }
  
  if(textarea_element.scrollHeight > check_scrollHeight) {
    textarea_element.style.height = 0;
    textarea_element.style.height = (parseInt(textarea_element.scrollHeight) + 3) + "px";
  } else {
    textarea_element.style.height = 0;
    textarea_element.style.height = (parseInt(check_scrollHeight) + 4) + "px";
  }
}

// set cursor at end of string when input selected
function cursor_at_end() {
  //console.log(event.target);
  var temp_value = event.target.value; 
  event.target.value = '';
  event.target.value = temp_value;
}
function set_key(event) {
  document.getElementById(event.target.id).value = event.key;
  update_est_placeholders();
  if(event.target.id === "cell_counts") {
    get_diff_keys();
    update_cell_counts();
  } else if(event.target.id === "est_wbc_counts") {
    update_wbc_estimate();
  }
  
}
function update_wbc_estimate() {
  // update cell keys
  //calc_cell_keys = cell_keys.querySelectorAll("input");
  
  //
  calc_cell_counts = cell_counts.value;
  if(isNaN(parseInt(calc_cell_counts))) {return;}
}
//update_wbc_estimate();

function set_key_validity(event) {
  if(event.target.value.trim() === "") {
    event.target.value = "";
    event.target.placeholder = "?";
    event.target.style.border = "2px solid #FF1E00";
    event.target.style.margin = "";
  } else {
    if(event.target.id === "est_wbc_factor") {
      //event.target.style.borderStyle = "none none solid none";
      event.target.style.border = "none";
      event.target.style.borderBottom = '1px solid gray';
      event.target.style.margin = "2px 2px 1px 2px";
    } else {
      event.target.style.border = "";
    }
  }
  update_est_placeholders();
}
update_est_placeholders();
function remove_white_space(elem) {
  elem.value = elem.value.trim();
}

function update_est_placeholders() {
  field_value_wbc_key = est_wbc_field_key.value;
  field_value_plt_key = est_plt_field_key.value;
  wbc_value_key = est_wbc_count_key.value;
  plt_value_key = est_plt_count_key.value;
  
  wbc_est_input_keys = [field_value_wbc_key,
                          wbc_value_key];
  plt_est_input_keys = [field_value_plt_key,
                          plt_value_key];
  
  correct_wbc_placeholder = "Type '" + 
                              field_value_wbc_key + 
                              "' per field, then '" +
                              wbc_value_key +
                              "' per WBC";
  correct_plt_placehoder = "Type '" + 
                              field_value_plt_key + 
                              "' per field, then '" +
                              plt_value_key +
                              "' per PLT";
  
  if(field_value_wbc_key === wbc_value_key) {
    est_wbc_counts.placeholder = "Field key can not equal WBC key";
    est_wbc_counts.style.border = "2px solid red";
    est_wbc_field_key.style.border = "2px solid red";
    est_wbc_count_key.style.border = "2px solid red";
  } else {
    est_wbc_counts.placeholder = correct_wbc_placeholder;
    est_wbc_counts.style.border = "";
    est_wbc_field_key.style.border = "";
    est_wbc_count_key.style.border = "";
  }
  if(field_value_plt_key === plt_value_key) {
    est_plt_counts.placeholder = "Field key can not equal PLT key";
    est_plt_counts.style.border = "2px solid red";
    est_plt_field_key.style.border = "2px solid red";
    est_plt_count_key.style.border = "2px solid red";
  } else {
    est_plt_counts.placeholder = correct_plt_placehoder;
    est_plt_counts.style.border = "";
    est_plt_field_key.style.border = "";
    est_plt_count_key.style.border = "";
  }
}
//update_est_placeholders();

// check estimate factor validity 
function check_est_factor_valid() {
  if(event.target.value === "") {
    if(event.target.id.includes("wbc")) {
      event.target.value = "2.0";
      update_wbc_est_calc();
    }
    if(event.target.id.includes("plt")) {
      event.target.value = "25";
      update_plt_est_calc();
    }
  } else {
    /*if(event.target.value.includes(".")) {
      event.target.value = Number(event.target.value.slice(-4)).toFixed(1);
    } else {
      event.target.value = event.target.value.slice(-3);
    }*/
  }
}
// update WBC estimate calculation
function update_wbc_est_calc() {
  //if(est_wbc_counts.value.length === 0) {return;}
  
  wbc_est_value = est_wbc_counts.value;
  wbc_est_value_array = wbc_est_value.split('');
  
  wbc_est_keys = Array.from(new Set(wbc_est_value_array));
  wbc_est_warning_check();
  
  
  if(est_wbc_field_key.value === est_wbc_count_key.value ||
      !est_wbc_counts.value) {
    wbc_est_num_fields.innerHTML = "0";
    wbc_est_avg_wbc.innerHTML = "0";
    value_wbc_est.value = "?";
    wbc_est_calc_val.innerHTML = "0";
    est_print_area_wbc_values.innerHTML = 
      "Fields: " + wbc_est_num_fields.innerHTML +
      " | " + 
      "Avg WBC: " + wbc_est_avg_wbc.innerHTML +
      " | " + 
      "Factor: " + est_wbc_factor.value +
      " &#8756; " +
      "WBC Estimate = " + wbc_est_calc_val.innerHTML;
    
    return;
  }
  
  // fill number of fields
  wbc_est_num_fields
    .innerHTML = wbc_est_value_array
                  .filter(e => e === est_wbc_field_key.value)
                  .length;
  // fill avg WBCs per field
  wbc_est_num_wbcs = wbc_est_value_array
                      .filter(e => e === est_wbc_count_key.value)
                      .length;
  wbc_est_total_fields = Number(wbc_est_num_fields.innerHTML);
  if(wbc_est_total_fields === 0) {
    wbc_est_total_fields = 1;
  }
  wbc_est_avg_wbc
    .innerHTML = (wbc_est_num_wbcs / wbc_est_total_fields).toFixed(1);
    
  // fill WBC estimate in instrument and estimate area
  value_wbc_est
    .value = Number(wbc_est_avg_wbc.innerHTML) * 
              Number(est_wbc_factor.value);
  wbc_est_calc_val
  .innerHTML = Number(wbc_est_avg_wbc.innerHTML) * 
                Number(est_wbc_factor.value);
  
  
  // fill print area 
  est_print_area_wbc_values.innerHTML = 
    "Fields: " + wbc_est_num_fields.innerHTML +
    " | " + 
    "Avg WBC: " + wbc_est_avg_wbc.innerHTML +
    " | " + 
    "Factor: " + est_wbc_factor.value +
    " &#8756; " +
    "WBC Estimate = " + wbc_est_calc_val.innerHTML;
}

// update WBC estimate calculation
function update_plt_est_calc() {
  //if(est_plt_counts.value.length === 0) {return;}
  
  plt_est_value = est_plt_counts.value;
  plt_est_value_array = plt_est_value.split('');
  
  plt_est_keys = Array.from(new Set(plt_est_value_array));
  plt_est_warning_check();
  
  
  if(est_plt_field_key.value === est_plt_count_key.value ||
      !est_plt_counts.value) {
    plt_est_num_fields.innerHTML = "0";
    plt_est_avg_plt.innerHTML = "0";
    value_plt_est.value = "";
    plt_est_calc_val.innerHTML = "0";
    est_print_area_plt_values.innerHTML = 
      "Fields: " + plt_est_num_fields.innerHTML +
      " | " + 
      "Avg PLT: " + plt_est_avg_plt.innerHTML +
      " | " + 
      "Factor: " + est_plt_factor.value +
      " &#8756; " +
      "PLT Estimate = " + plt_est_calc_val.innerHTML;
    
    return;
  }
  
  // fill number of fields
  plt_est_num_fields
    .innerHTML = plt_est_value_array
                  .filter(e => e === est_plt_field_key.value)
                  .length;
  // fill avg PLTs per field
  plt_est_num_plts = plt_est_value_array
                      .filter(e => e === est_plt_count_key.value)
                      .length;
  plt_est_total_fields = Number(plt_est_num_fields.innerHTML);
  if(plt_est_total_fields === 0) {
    plt_est_total_fields = 1;
  }
  plt_est_avg_plt
    .innerHTML = (plt_est_num_plts / plt_est_total_fields).toFixed(1);
    
  // fill PLT estimate in instrument and print area
  value_plt_est
    .value = (Number(plt_est_avg_plt.innerHTML) * 
                Number(est_plt_factor.value))
              .toFixed(0);
  plt_est_calc_val
    .innerHTML = (Number(plt_est_avg_plt.innerHTML) * 
                Number(est_plt_factor.value))
              .toFixed(0);
  
  // fill print area 
  est_print_area_plt_values.innerHTML = 
    "Fields: " + plt_est_num_fields.innerHTML +
    " | " + 
    "Avg PLT: " + plt_est_avg_plt.innerHTML +
    " | " + 
    "Factor: " + est_plt_factor.value +
    " &#8756; " +
    "PLT Estimate = " + plt_est_calc_val.innerHTML;
}

// on html load, add onfocus and onkeypress to cell_keys and est_keys div inputs
set_key_keys = document
                .querySelectorAll("input[id^=est_]:not(#est_wbc_factor, \
                                    #est_plt_factor), \
                                    input[id^=diff_]:not(#diff_add_another)");
for(var skk = 0; skk < set_key_keys.length; skk++) {
  set_key_keys[skk].addEventListener("focus", cursor_at_end);
  set_key_keys[skk].addEventListener("keypress", set_key);
  set_key_keys[skk].addEventListener("keyup", set_key_validity);
}

// update view if differential task is selected
function task_diff_select() {
  task_view = document.getElementById("task_diff");
  //if(task_view.checked) {
      //cell_diff_container.style.display = "flex";
  //  } else {
      //cell_diff_container.style.display = "none";
  //  }
}
// update view if differential task is selected
function task_est_select() {
  task_wbc_est_view = document.getElementById("task_wbc_est");
  task_plt_est_view = document.getElementById("task_plt_est");
  
  if(task_wbc_est_view.checked ||
      task_plt_est_view.checked) {
      est_keys_counts.style.display = "flex";
      
      if(task_wbc_est_view.checked) {
        est_wbc_area.style.display = "flex";
      } else {
        est_wbc_area.style.display = "none";
      }
      
      if(task_plt_est_view.checked) {
        est_plt_area.style.display = "flex";
      } else {
        est_plt_area.style.display = "none";
      }
    } else {
      est_keys_counts.style.display = "none";
    }
}
task_diff_select();
task_est_select();

function update_letter_spacing(elem) {
  if(elem.id === "cell_counts" ||
      elem.id === "est_wbc_counts" ||
      elem.id === "est_plt_counts") {
    // adjust letter spacing if empty or not
    if(parseInt(elem.value.length) > 0 &&
        elem.id !== "path_rev_comments") {
      document.getElementById(elem.id).classList.remove("textarea_empty");
      document.getElementById(elem.id).classList.add("textarea_not_empty");
    } else {
      document.getElementById(elem.id).classList.add("textarea_empty");
      document.getElementById(elem.id).classList.remove("textarea_not_empty");
    }
  }
}

// get all diff keyboard associations
diff_keys_all_values = [];
function get_diff_keys() {
  diff_keys_all = document
                    .querySelectorAll("[id^=diff_rep_key], \
                                        [id^=user_defined_diff_rep_key]");
  
  for(dka = 0; dka < diff_keys_all.length; dka++) {
    diff_keys_all_values[dka] = diff_keys_all[dka].value;
  }
  update_cell_counts();
}

// WBC estimate key use warnings 
function wbc_est_warning_check() {
  // hide warning message if no counts
  if(est_wbc_counts.value.length === 0) {
    est_wbc_key_warning.style.display = 'none';
    return;
  }
  
  est_wbc_key_warning_area.innerHTML = '';
  est_wbc_key_warning.style.display = 'none';
  for(wek = 0; wek < wbc_est_keys.length; wek++) {
    if(!wbc_est_input_keys.includes(wbc_est_keys[wek])) {
      wbc_est_warning_message(wbc_est_keys[wek]);
      est_wbc_key_warning.style.display = 'block';
    }
  }
}
function wbc_est_warning_message(wbc_est_warning_key) {
  warn_item = document.createElement("li");
  warn_item.innerHTML = '"<strong>' + wbc_est_warning_key + '</strong>" is not assigned!';
  est_wbc_key_warning_area.appendChild(warn_item);
}

// PLT estimate key use warnings 
function plt_est_warning_check() {
  // hide warning message if no counts
  if(est_plt_counts.value.length === 0) {
    est_plt_key_warning.style.display = 'none';
    return;
  }
  
  est_plt_key_warning_area.innerHTML = '';
  est_plt_key_warning.style.display = 'none';
  for(pek = 0; pek < plt_est_keys.length; pek++) {
    if(!plt_est_input_keys.includes(plt_est_keys[pek])) {
      plt_est_warning_message(plt_est_keys[pek]);
      est_plt_key_warning.style.display = 'block';
    }
  }
}
function plt_est_warning_message(plt_est_warning_key) {
  warn_item = document.createElement("li");
  warn_item.innerHTML = '"<strong>' + plt_est_warning_key + '</strong>" is not assigned!';
  est_plt_key_warning_area.appendChild(warn_item);
}


function diff_warning_check() {
  //console.log(event.key);
  if(cell_counts.value.length === 0) {
    cell_counts_warning.style.display = 'none';
    return;
  }
  document.getElementById("diff_warning_area").innerHTML = '';
  document.getElementById("cell_counts_warning").style.display = 'none';
  for(dks = 0; dks < diff_key_set.length; dks++) {
    if(!diff_keys_all_values.includes(diff_key_set[dks])) {
      diff_warning_message(diff_key_set[dks]);
      document.getElementById("cell_counts_warning").style.display = 'block';
      cc_value_array_filtered = cc_value_array_filtered
                                  .filter(key => key !== diff_key_set[dks]);
    }
  }
}
function diff_warning_message(diff_warning_key) {
  warn_item = document.createElement("li");
  warn_item.innerHTML = '"<strong>' + diff_warning_key + '</strong>" is not assigned!';
  document.getElementById("diff_warning_area").appendChild(warn_item);
}

get_diff_keys();
for(var gdk = 0; gdk < diff_keys_all.length; gdk++) {
  diff_keys_all[gdk].addEventListener("focus", cursor_at_end);
  diff_keys_all[gdk].addEventListener("keyup", get_diff_keys);
  diff_keys_all[gdk].addEventListener("keyup", diff_warning_check);
}

// show and calculate absolute WBC concentrations
all_wbc_abs = Array
                .from(document
                        .querySelectorAll(" \
                            #cell_conc_cells_head > div:nth-child(5), \
                            [id^=conc_abs]"));
function ucwbc_check() {
  if(document.activeElement.id === "UCWBC" &&
      cell_counts.value.length > 0 &&
      UCWBC.value === "") {
    UCWBC.classList.remove("wrong_value_inactive_anim");
    UCWBC.classList.add("wrong_value_active_anim");
  }
  // focused and numerically valid
  else if(document.activeElement.id === "UCWBC" &&
      UCWBC.value === "") {
    //console.log("true,1");
    UCWBC.classList.remove("wrong_value_inactive_anim");
    UCWBC.classList.remove("wrong_value_active_anim");
    all_wbc_abs.forEach(e => e.style.display = "none");
  }
  // focused and numerically valid
  else if(document.activeElement.id === "UCWBC" &&
            Number(UCWBC.value) >= 0 &&
            cell_counts.value.length === 0) {
    //console.log("true,2");
    UCWBC.classList.remove("wrong_value_inactive_anim");
    UCWBC.classList.remove("wrong_value_active_anim");
    all_wbc_abs.forEach(e => e.style.display = "");
    update_cell_counts();
  }
  // NOT focused and numerically INvalid
  else if(Number(UCWBC.value) > 0) {
    //console.log("true,3");
    UCWBC.classList.remove("wrong_value_active_anim");
    UCWBC.classList.remove("wrong_value_inactive_anim");
    all_wbc_abs.forEach(e => e.style.display = "");
    update_cell_counts();
  } else if(cell_counts.value.length > 0) {
    UCWBC.classList.remove("wrong_value_active_anim");
    UCWBC.classList.add("wrong_value_inactive_anim");
    all_wbc_abs.forEach(e => e.style.display = "none");
  } else {
    //console.log("true,4");
    UCWBC.value = "";
    UCWBC.classList.remove("wrong_value_active_anim");
    UCWBC.classList.remove("wrong_value_inactive_anim");
    all_wbc_abs.forEach(e => e.style.display = "none");
  }
  if(UCWBC.value.charAt(0) === ".") {
    UCWBC.value = "0" + UCWBC.value
  } else if(document.activeElement.id !== "UCWBC") {
    UCWBC.value = UCWBC.value
  }
}
all_wbc_abs.forEach(e => e.style.display = "none");


function update_cell_counts() {
  /*if(cell_counts.value.length === 0) {
    diff_warning_check();
    return;
  }*/
  
  // cell counts
  //cc_value = event.target.value;
  cc_value = cell_counts.value;
  cc_value_array = cc_value.split('');
  cc_value_array_filtered = cc_value_array;
  cc_nrbc = cc_value_array.filter(e =>
    e === diff_rep_key_nrbc.value
  ).length;
  
  
  // unique values in differential
  diff_key_set = Array.from(new Set(cc_value_array));
  diff_warning_check();
  
  cc_total = cc_value_array_filtered.length - cc_nrbc;
  cell_counts_total.innerHTML = "Total: " + cc_total;
  conc_num_total.innerHTML = cc_total;
  
  // place holder for neut seg + band stages concentrations
  num_seg_band_cells = 0;
  // place holder for all neut stages concentrations
  num_neut_cells = 0;
  //place holder for total percents
  total_perc_conc = 0;
  //place holder for total absolutes
  total_abs_conc = 0;
  
  // uncorrected WBC
  wbc_uncor = Number(UCWBC.value);
  if(!wbc_uncor > 0) {
    UCWBC.classList.add("wrong_value_inactive_anim");
  } else {
    UCWBC.classList.remove("wrong_value_inactive_anim");
  }
  // corrected WBC
  wbc_cor = ((Number(wbc_uncor)*100)/(100+cc_nrbc)).toFixed(1);
  WBC.value = wbc_cor;
  
  // correct WBC count for the presence of nRBCs
  WBC.value = ((Number(UCWBC.value) * 100) / 
                (Number(conc_perc_nrbc.innerHTML) + 100))
                .toFixed(1);
  if(cc_nrbc > 0 && Number(UCWBC.value) > 0) {
    WBC.parentElement.style.display = "";
  } else {
    WBC.parentElement.style.display = "none";
  }
  
  // get all key associations from from get_diff_keys()
  // prevent NaNs for absolute and percent counts 
  if(cc_total === 0) {
    cc_total = 1;
    UCWBC.classList.remove("wrong_value_inactive_anim");
  }
  for(var gdk = 0; gdk < diff_keys_all.length; gdk++) {
    
    // number of specific cells diffed
    num_cell_type = cc_value_array_filtered
                      .filter(e => e === diff_keys_all[gdk].value).length;
    
    // control decimal display
    if(num_cell_type === 0) {
      toFixed_dec = 0;
    } else {
      toFixed_dec = 1;
    }
    // skip if cell not in diff
    //if(num_cells === 0) {continue;}
    
    // update number cell count
    num_cells = document
                  .getElementById(diff_keys_all[gdk]
                                    .id
                                    .replace('diff_rep_key', 'conc_num'));
    num_cells.innerHTML = num_cell_type;
    
    // update percent cell count
    perc_cells = document
                  .getElementById(diff_keys_all[gdk]
                                    .id
                                    .replace('diff_rep_key', 'conc_perc'));
    perc_cells.innerHTML = (num_cell_type/cc_total*100).toFixed(toFixed_dec);
    if(gdk !== 13) {
      total_perc_conc = (Number(total_perc_conc) + 
                          Number(perc_cells.innerHTML))
                        .toFixed(toFixed_dec);
      conc_perc_total.innerHTML = total_perc_conc;
    }
    
    // update absolute cell count
    abs_cells = document
                  .getElementById(diff_keys_all[gdk]
                                    .id
                                    .replace('diff_rep_key', 'conc_abs'));
    abs_cells.innerHTML = (num_cell_type/cc_total*wbc_cor).toFixed(toFixed_dec);
    if(gdk !== 13) {
      total_abs_conc = (Number(total_abs_conc) +
                          Number(abs_cells.innerHTML))
                        .toFixed(toFixed_dec);
      conc_abs_total.innerHTML = total_perc_conc;
    }
    
    // update nuet seg + band stages concentration
    if(gdk < 2) {
      num_seg_band_cells = num_seg_band_cells + num_cell_type;
      conc_num_seg_band
        .innerHTML = num_seg_band_cells;
      conc_perc_seg_band
        .innerHTML = (num_seg_band_cells/cc_total*100).toFixed(toFixed_dec);
      conc_abs_seg_band
        .innerHTML = (num_seg_band_cells/cc_total*Number(WBC.value)).toFixed(toFixed_dec);
    }
    // update all nuet stages concentration
    if(gdk < 5) {
      num_neut_cells = num_neut_cells + num_cell_type;
      conc_num_neut_all
        .innerHTML = num_neut_cells;
      conc_perc_neut_all
        .innerHTML = (num_neut_cells/cc_total*100).toFixed(toFixed_dec);
      conc_abs_neut_all
        .innerHTML = (num_neut_cells/cc_total*Number(WBC.value)).toFixed(toFixed_dec);
    }
  }
  
  // show green textarea border when >= 100 cells
  if(cc_total >= 100) {
    cell_counts.style.background = 'rgb(15, 255, 80)';
    cell_counts.style.border = '1px solid gray';
  } else {
    cell_counts.style.background = '';
    cell_counts.style.border = '';
  }
}

// add new user defined cell Type
user_defined_cell = 1;
function add_new_cell_type() {
  
  // child to insert before
  ref_node = document.getElementById("cell_conc_cells_add_cell");
  
  // new child (cell type)
  frag = document.createDocumentFragment();
  
  // main level
  new_cell_type = document.createElement("div");
  new_cell_type.id = "user_defined_cell_" + user_defined_cell;
  new_cell_type.classList.add("cell_conc_cells");
  frag.appendChild(new_cell_type);
  
  // level 1
  
  // input div
  lvl_1_1 = document.createElement("div");
  lvl_1_1_input = document.createElement("input");
  lvl_1_1_input.id = "user_defined_diff_rep_key_" + user_defined_cell;
  lvl_1_1_input.type = "text";
  lvl_1_1_input.setAttribute("placeholder", "?");
  lvl_1_1_input.size = 1;
  lvl_1_1_input.maxLength = 1;
  lvl_1_1_input.style.border = "2px solid #FF1E00";
  //lvl_1_1_input.style.borderRadius = "2px";
  lvl_1_1.appendChild(lvl_1_1_input);
  
  // cell type description div
  lvl_1_2 = document.createElement("div");
  lvl_1_2.id = "user_defined_conc_name_" + user_defined_cell;
  lvl_1_2_input = document.createElement("input");
  lvl_1_2_input.id = "user_defined_conc_name_descr_" + user_defined_cell;
  lvl_1_2_input.placeholder = "Input Cell Desription";
  lvl_1_2_input.style.width = "100%";
  lvl_1_2_input.maxLength = 40;
  lvl_1_2_span_full = document.createElement("span");
  lvl_1_2_span_full.id = "user_defined_span_full_" + user_defined_cell;
  lvl_1_2_span_full.classList.add("flex-cell-types-full-name");
  lvl_1_2_span_short = document.createElement("span");
  lvl_1_2_span_short.id = "user_defined_span_short_" + user_defined_cell;
  lvl_1_2_span_short.classList.add("flex-cell-types-short-name");
  lvl_1_2_span_acronym = document.createElement("span");
  lvl_1_2_span_acronym.id = "user_defined_span_acronym_" + user_defined_cell;
  lvl_1_2_span_acronym.classList.add("flex-cell-types-acronym-name");
  lvl_1_2.appendChild(lvl_1_2_span_full);
  lvl_1_2.appendChild(lvl_1_2_span_short);
  lvl_1_2.appendChild(lvl_1_2_span_acronym);
  lvl_1_2.appendChild(lvl_1_2_input);
  
  // cell concentration absolute and percentage divs
  lvl_1_3 = document.createElement("div");
  lvl_1_3.id = "user_defined_conc_num_" + user_defined_cell;
  lvl_1_3.innerHTML = "0";
  lvl_1_4 = document.createElement("div");
  lvl_1_4.id = "user_defined_conc_perc_" + user_defined_cell;
  lvl_1_4.innerHTML = "0";
  lvl_1_5 = document.createElement("div");
  lvl_1_5.id = "user_defined_conc_abs_" + user_defined_cell;
  lvl_1_5.innerHTML = "0";
  
  // combine all frags into div
  frag.lastElementChild.appendChild(lvl_1_1);
  frag.lastElementChild.appendChild(lvl_1_2);
  frag.lastElementChild.appendChild(lvl_1_3);
  frag.lastElementChild.appendChild(lvl_1_4);
  frag.lastElementChild.appendChild(lvl_1_5);
  
  add_location = document.getElementById("cell_conc_cells_add_cell");
  add_location.insertAdjacentHTML("beforebegin", frag.childNodes[0].outerHTML);
  
  // add input actions to diff key
  dk_aEL = document.getElementById("user_defined_diff_rep_key_" + user_defined_cell);
  dk_aEL.addEventListener("focus", cursor_at_end);
  dk_aEL.addEventListener("keyup", get_diff_keys);
  dk_aEL.addEventListener("keyup", diff_warning_check);
  dk_aEL.addEventListener("keypress", set_key);
  dk_aEL.addEventListener("keyup", set_key_validity);
  dk_aEL.addEventListener("keyup", update_cell_counts);
  
  // add input actions to cell descritpions
  // cell description div containing input and spans
  cn_aEL = document.getElementById("user_defined_conc_name_" + user_defined_cell);
  
  // show input and hide span names
  cn_aEL.addEventListener("mouseenter", event => {
    // hide spans                                   
    Array.from(event
                .target
                .getElementsByTagName("span"))
            .forEach(s => s.style.display = "none");
            
    cn_aEL = event.target.id;
    _cn_aEL = document.getElementById("user_defined_conc_name_descr_" 
                                        + cn_aEL.slice(-1));
    _cn_aEL.style.display = "inline";
    _cn_aEL.style.border = "";
    _cn_aEL.focus();
  });
  
  
  // cell description input
  cd_aEL = document
            .getElementById("user_defined_conc_name_descr_" + user_defined_cell);
  cd_aEL.addEventListener("focusout", event => {
    user_defined_num = event.target.id.slice(-1);
    user_defined_cell_type = document
                              .getElementById("user_defined_conc_name_descr_" 
                                                + user_defined_num);
    user_defined_descr = user_defined_cell_type
                           .value
                           .trim();
    
    if(user_defined_descr === "") {
      //event.target.style.border = "2px solid #FF1E00";
      //event.target.style.borderRadius = "2px";
      //event.target.parentElement.remove();
      document
        .getElementById("user_defined_cell_" + user_defined_num)
        .remove();
        
      //console.log("focusout", event.target);
    } else {
      //console.log("focusout", "false", event.target.parentElement);
      Array.from(event
                  .target
                  .parentElement
                  .getElementsByTagName("span"))
                  .forEach(s => s.style.display = "");
      document
        .getElementById("user_defined_span_full_"
                          + user_defined_num)
        .innerHTML = user_defined_descr;
      document
        .getElementById("user_defined_span_short_"
                          + user_defined_num)
        .innerHTML = user_defined_descr;
      document
        .getElementById("user_defined_span_acronym_"
                          + user_defined_num)
        .innerHTML = user_defined_descr.toUpperCase();
      user_defined_cell_type.style.border = "none";
      user_defined_cell_type.style.display = "none";
    }
  });
  
  // set focus on new cell description field
  //document.getElementById("user_defined_conc_name_descr_" + user_defined_cell).focus();
  
  user_defined_cell++;
  
  // update cell type list for ucwbc_check()
  all_wbc_abs = Array
                  .from(document
                          .querySelectorAll(" \
                              #cell_conc_cells_head > div:nth-child(5), \
                              [id^=conc_abs], \
                              [id^=user_defined_conc_abs_]"));
  ucwbc_check();
}



function enter_to_tab(elem) {
  if(event.key === 'Enter') {
    if(elem.id === "side1") {
      //document.getElementById("side2").focus();
    } else if(elem.id === "side2") {
      //  document.getElementById("side1").focus();
    }
    event.preventDefault();
  }
}

function underline(event) {
  //console.log(event.target.nextElementSibling);
  event.target.style.borderBottom = "1px solid black";
}

// Visually show user selected Task
function sibling_task_user_select(event) {
  // get task target
  if(event.target.nodeName === "SPAN") {
    target_task = event.target.parentElement;
  } else {
    target_task = event.target;
  }
  
  target_parent = target_task.parentElement.parentElement;
  target_task_options = target_parent.children[0].children;
  
  if(target_task.classList.contains("task_active")) {
    target_task.classList.remove("task_active");
    if(!target_task.id.includes("rbc") &&
        !target_parent.children[1].children[0].classList.contains("task_active") &&
        !target_parent.children[2].children[0].classList.contains("task_active")) {
          target_task_options[0].classList.remove("task_active");
        } else if(target_task.id.includes("rbc")) {
          target_task_options[0].classList.remove("task_active");
        }
  } else {
    target_task.classList.add("task_active");
    target_task_options[0].classList.add("task_active");
  }
  update_task_display();
}
all_task_options = document.querySelectorAll("[class^=task_to_do_]");
all_task_options.forEach(arg => {
  arg.addEventListener("click", sibling_task_user_select);
});

// Visually show task if group descritption seleccted
function parent_task_user_select(event) {
  // get parent target
  if(event.target.nodeName === "SPAN") {
    target_task = event.target.parentElement;
  } else {
    target_task = event.target;
  }
  child1 = target_task
            .parentElement
            .nextElementSibling
            .children[0]
  child2 = target_task
            .parentElement
            .nextElementSibling
            .nextElementSibling
            .children[0]
  if(target_task.parentElement.nextElementSibling.id.includes("rbc") &&
      child1.classList.contains("task_active")) {
    target_task.classList.remove("task_active");
    child1.classList.remove("task_active");
  } else if(child1.classList.contains("task_active") &&
      child2.classList.contains("task_active")) {
    target_task.classList.remove("task_active");
    child1.classList.remove("task_active");
    child2.classList.remove("task_active");
  } else if(child1.classList.contains("task_active") &&
              child2.classList.contains("task_active")) {
    target_task.classList.add("task_active");
    child1.classList.add("task_active");
    child2.classList.add("task_active");
  } else {
    target_task.classList.add("task_active");
    child1.classList.add("task_active");
    child2.classList.add("task_active");
  }
  update_task_display();
}
all_parent_task_options = document.querySelectorAll(".task_descr_format");
all_parent_task_options.forEach(arg => {
  arg.addEventListener("click", parent_task_user_select)
  });
 

// update display view for the tasks selected
function update_task_display() {
  all_task_options.forEach(target => {
    tp = target.parentElement;
    if(target.classList.contains("task_active")) {
      if(tp.id.includes("wbc_diff")) {
        wbc_diff_area.style.display = "";
      } else if(tp.id.includes("wbc_est")) {
        wbc_estimate_area.style.display = "";
        value_wbc_est.parentElement.style.display = "";
        est_keys_counts.style.display = "flex";
      } else if(tp.id.includes("rbc_morph")) {
        rbc_morph_area.style.display = "";
      } else if(tp.id.includes("plt_morph")) {
        plt_morph_area.style.display = "";
      } else if(tp.id.includes("plt_est")) {
        plt_estimate_area.style.display = "";
        value_plt_est.parentElement.style.display = "";
        est_keys_counts.style.display = "flex";
      }
    } else if(!target.classList.contains("task_active")) {
      if(tp.id.includes("wbc_diff")) {
        wbc_diff_area.style.display = "none";
      } else if(tp.id.includes("wbc_est")) {
        wbc_estimate_area.style.display = "none";
        value_wbc_est.parentElement.style.display = "none";
      } else if(tp.id.includes("rbc_morph")) {
        rbc_morph_area.style.display = "none";
      } else if(tp.id.includes("plt_morph")) {
        plt_morph_area.style.display = "none";
      } else if(tp.id.includes("plt_est")) {
        plt_estimate_area.style.display = "none";
        value_plt_est.parentElement.style.display = "none";
      }
    }
    if(value_wbc_est.parentElement.style.display === "none" &&
        value_plt_est.parentElement.style.display === "none") {
      est_keys_counts.style.display = "none";
    } else {
      est_keys_counts.style.display = "";
    }
  });
}
update_task_display();

// Visually show user selected RBC grade
function rbc_morph_select_grade(event) {
  // Deselect "Normal" RBC morphology
  rbc_morph_norm.children[0]
    .classList
    .remove("rbc_grade_type_active");
  rbc_morph_norm.children[0]
    .classList
    .add("rbc_morph_grade_inactive");
  
  if(event.target.nodeName === "SPAN") {
    target_morph = event.target.parentElement;
  } else {
    target_morph = event.target;
  }
  target_grade_name = target_morph
                        .parentElement
                        .getElementsByClassName("rbc_morph_descr")[0];
  target_grades = target_morph
                    .parentElement
                    .querySelectorAll("[id^=rbc_morph_]");
  target_grades.forEach(e => {
    if(e.id !== target_morph.id ||
          e.classList.contains("rbc_morph_grade_active")) {
      e.classList.remove("rbc_morph_grade_active");
      e.classList.add("rbc_morph_grade_inactive");
    } else {
      e.classList.add("rbc_morph_grade_active");
      e.classList.remove("rbc_morph_grade_inactive");
    }
  });
  grade_selected = 0;
  target_grades.forEach(e => {
    if(e.classList.contains("rbc_morph_grade_active")) {
      grade_selected ++;
    }
  });
  if(grade_selected === 0) {
    target_morph.parentElement.classList.add("rbc_morph_grade_inactive");
    target_grades.forEach(e => {
      e.classList.remove("rbc_morph_grade_inactive");
    });
  } else {
    target_morph.parentElement.classList.remove("rbc_morph_grade_inactive");
    target_grade_name.classList.remove("rbc_morph_grade_inactive");
    target_morph.parentElement.classList.add("rbc_morph_print");
  }
}
all_rbc_grades = document.querySelectorAll("[id$=_sl], [id$=_mod], [id$=_mk]");
all_rbc_grades.forEach(arg => arg.addEventListener("click", rbc_morph_select_grade));

// Chnage RBC Morph view from SL,MD,MK to 1+,2+,3+
function rbc_grade_type_change(event) {
  if(event.target.id.includes("_slmodmk")) {
    event.target.classList.add("rbc_grade_type_active");
    document
      .getElementById("rbc_morph_grade_123")
      .classList
      .remove("rbc_grade_type_active")
    document
      .querySelectorAll("[class=rbc_grade_name]")
      .forEach(e => {
        e.style.display = "inline";
      });
      document
      .querySelectorAll("[class=rbc_grade_num]")
      .forEach(e => {
        e.style.display = "none";
      });
  } else {
    event.target.classList.add("rbc_grade_type_active");
    document
      .getElementById("rbc_morph_grade_slmodmk")
      .classList
      .remove("rbc_grade_type_active")
    document
      .querySelectorAll("[class=rbc_grade_name]")
      .forEach(e => {
        e.style.display = "none";
      });
      document
      .querySelectorAll("[class=rbc_grade_num]")
      .forEach(e => {
        e.style.display = "inline";
      });
  }
}

// RBC Morph Normal
rbc_norm_click = document
                  .getElementsByClassName("rbc_morph_class_norm")[0];
rbc_norm_click.classList.add("rbc_morph_grade_inactive");
// RBC Morph ABNormals
rbc_abn_click = document
                  .querySelectorAll(".rbc_morph_grade, \
                                      .rbc_morph_descr, \
                                      .rbc_morph_incl");
rbc_abn_click.forEach(arg => arg.classList.add("rbc_morph_grade_inactive"));
function rbc_morph_select_norm(event) {
  target_norm = event.target;
  if(target_norm.classList.contains("rbc_grade_type_active")) {
    target_norm.classList.remove("rbc_grade_type_active");
    target_norm.classList.add("rbc_morph_grade_inactive");
  } else {
    target_norm.classList.remove("rbc_morph_grade_inactive");
    target_norm.classList.add("rbc_grade_type_active");
    // make all abn morphs inactive
    Array.from(rbc_abn_click)
      .forEach(e => {
        e.classList.add("rbc_morph_grade_inactive");
        e.classList.remove("rbc_morph_grade_active");
        e.classList.remove("rbc_grade_type_active");
      });
  }
}
rbc_norm_click.addEventListener("click", rbc_morph_select_norm);


// WBC Morph, Path Rev, RBC Morph Inclusions, Platelet Morph
wbc_path_rbc = document
                .querySelectorAll(".wbc_morphs, .path_rev, \
                                    .rbc_morph_incl, .plt_morphs");
plt_est_options = document.querySelectorAll("div[id*=plt_est_] > .rbc_morph_incl_div");
function rbc_morph_select_incl(event) {
  if(event.target.parentElement.classList.contains("wbc_morphs")) {
    target_morph = event.target.parentElement;
  } else if(event.target.parentElement.id.includes("plt_est")) {
    console.log("true");
    plt_est_moused = event.target.innerHTML;
    plt_est_options
      .forEach(peo => {
        if(peo.children[0].innerHTML !== plt_est_moused) {
          peo.children[0].classList.replace("rbc_morph_grade_active", "rbc_morph_grade_inactive");
        } else {
          if(peo.children[0].classList.contains("rbc_morph_grade_inactive")) {
            peo.children[0].classList.replace("rbc_morph_grade_inactive", "rbc_morph_grade_active");
          } else {
            peo.children[0].classList.replace("rbc_morph_grade_active", "rbc_morph_grade_inactive");
          }
        }
      });
  } else {
    target_morph = event.target;
    if(target_morph.classList.contains("rbc_grade_type_active")) {
        target_morph.classList.remove("rbc_grade_type_active");
        target_morph.classList.add("rbc_morph_grade_inactive");
      } else {
        target_morph.classList.remove("rbc_morph_grade_inactive");
        target_morph.classList.add("rbc_grade_type_active");
        if(target_morph.classList.contains("rbc_morph_incl")) {
          rbc_norm_click.classList.remove("rbc_grade_type_active");
          rbc_norm_click.classList.add("rbc_morph_grade_inactive");
        }
      }
    }
}
wbc_path_rbc.forEach(arg => arg.classList.add("rbc_morph_grade_inactive"));
wbc_path_rbc.forEach(arg => arg.addEventListener("click", rbc_morph_select_incl));

window.addEventListener('resize', function(event){
  // adjust all textarea heights on window resize
  all_textareas
    .forEach(ta => {
      if(ta.id.includes("rbc")) {
        check_scrollHeight = orig_rbc_morph_scrollHeight;
      } else if(ta.id.includes("plt")) {
        check_scrollHeight = orig_plt_morph_scrollHeight;
      } else if(ta.id.includes("est_wbc")){
        check_scrollHeight = orig_est_wbc_scrollHeight;
      } else if(ta.id.includes("est_plt")){
        check_scrollHeight = orig_est_wbc_scrollHeight;
      } else {
        check_scrollHeight = orig_cc_scrollHeight;
      }
      
      if(ta.scrollHeight > check_scrollHeight) {
        ta.style.height = 0;
        ta.style.height = (parseInt(ta.scrollHeight) + 3) + "px";
      } else {
        ta.style.height = 0;
        ta.style.height = (parseInt(check_scrollHeight) + 4) + "px";
      }
    });
  
  // resize textarea for differential
  if(cell_counts.scrollHeight > orig_cc_scrollHeight) {
    cell_counts.style.height = 0;
    cell_counts.style.height = (parseInt(cell_counts.scrollHeight) + 3) + "px";
  } else {
    cell_counts.style.height = 0;
    cell_counts.style.height = (parseInt(orig_cc_scrollHeight) + 4) + "px";
  }
  //document.getElementById("cell_counts").style.height = parseInt((document.getElementById("cell_counts").scrollHeight)) + 3 + "px";
});

// Before print
window.addEventListener("beforeprint", (event) => {
  
  // add WBC estimate 
  if(task_wbc_est.children[0].classList.contains("task_active")) {
    est_print_area_wbc.style.display = "block";
  }
  // add PLT estimate 
  if(task_plt_est.children[0].classList.contains("task_active")) {
    est_print_area_plt.style.display = "block";
  }
  // Remove Path Comments if empty/not selected
  path_rev_comments_area_count = 0;
  Array
    .from(wbc_morph_path_rev.children)
    .forEach(e => {
      if(e.classList.contains("rbc_grade_type_active")) {
        e.classList.add("print");
        path_rev_comments_area_count ++;
      } else if(e.value) {
        e.classList.add("print");
        path_rev_comments_area_count ++;
      } else {
        e.classList.remove("print");
        e.classList.add("noprint");
      }
      if(path_rev_comments_area_count === 0) {
        path_rev_comments_area.classList.remove("print");
        path_rev_comments_area.classList.add("noprint");
      } else {
        path_rev_comments_area.classList.add("print");
        path_rev_comments_area.classList.remove("noprint");
      }
    });
    
    // no show RBC comment area if empty 
    if(!textarea_rbc_comments.value) {
      textarea_rbc_comments.classList.remove("print");
      textarea_rbc_comments.classList.add("noprint");
    }
    
    
    // no show PLT comment area if empty 
    if(!textarea_plt_comments.value) {
      textarea_plt_comments.classList.remove("print");
      textarea_plt_comments.classList.add("noprint");
    }
});

// After print
window.addEventListener("afterprint", (event) => {
  // Add WBC and PLT estimate area back
  est_print_area_wbc.style.display = "";
  est_print_area_plt.style.display = "";
  
  // Add display back Path Comments
  path_rev_comments_area.classList.remove("noprint");
  Array
    .from(wbc_morph_path_rev.children)
    .forEach(e => {
      e.classList.remove("noprint");
    });
  
  // show RBC comment area
  textarea_rbc_comments.classList.add("print");
  textarea_rbc_comments.classList.remove("noprint");
  
  
  // show PLT comment area
  textarea_plt_comments.classList.add("print");
  textarea_plt_comments.classList.remove("noprint");
});

document.addEventListener("mousedown", event => {
  if(event.detail > 1) {event.preventDefault();}
  
});
  



function a_c_checked() {
  accountablility_check.style.display = "none";
  document.getElementsByTagName("body")[0].classList.remove("noscroll");
}