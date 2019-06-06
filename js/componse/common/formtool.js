function fromtool(formp, data) {
    this.formp = formp;
    this.data = data;
    this.clean_data=function(){
        for (var i = 0; i < this.formp.length; i++) {
            if (formp[i].type == "input") {
                $("#" + formp[i].id).val("");
            } else if (formp[i].type == "select") {
                $("#" + formp[i].id).val("");
            } else if (formp[i].type == "radio") {
                //$("input[name='" + formp[i].id + "'][value=" + data[formp[i].p] + "]").attr("checked", true);
            }
        }
    },
    this.fill_data = function () {
            for (var i = 0; i < this.formp.length; i++) {
                if (formp[i].type == "input") {
                    $("#" + formp[i].id).val(data[formp[i].p]);
                } else if (formp[i].type == "select") {
                    if(formp[i].paramtype=="object"){
                    $("#" + formp[i].id).val(data[formp[i].p].id);
                    }
                    else if(formp[i].paramtype=="value") {
                        $("#" + formp[i].id).val(data[formp[i].p]);
                    }
                } else if (formp[i].type == "radio") {
                    $("input[name='" + formp[i].id + "'][value=" + data[formp[i].p] + "]").attr("checked", true);
                }
            }
        },
        this.load_data = function () {
            var data = {};
            for (var i = 0; i < this.formp.length; i++) {
                if (formp[i].paramtype == "value") {
                    if (formp[i].type == "input") {
                        eval("data." + formp[i].p + "='" + $("#" + formp[i].id).val() + "'");
                    } else if (formp[i].type == "select") {
                        eval("data." + formp[i].p + "='" + $("#" + formp[i].id).val() + "'");
                    } else if (formp[i].type == "radio") {
                        eval("data." + formp[i].p + "=" + $("input[name='" + formp[i].id + "']:checked").val());
                    }
                } else if (formp[i].paramtype == "object") {
                    if (formp[i].type == "input") {
                        eval("data." + formp[i].p + "={'id':'" + $("#" + formp[i].id).val() + "'}");
                    } else if (formp[i].type == "select") {
                        eval("data." + formp[i].p + "={'id':'" + $("#" + formp[i].id).val() + "'}");
                    } else if (formp[i].type == "radio") {
                        eval("data." + formp[i].p + "={'id':'" + $("input[name='" + formp[i].id + "']:checked").val() + "'}");
                    }
                }
            }
            return data;
        },
        this.form_validator_init = function (form,eventid, callback) {
            form.bootstrapValidator({
                live: 'disabled', //验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证               
                excluded: [':disabled', ':hidden', ':not(:visible)'], //排除无需验证的控件，比如被禁用的或者被隐藏的                
                submitButtons: '#btn-test', //指定提交按钮，如果验证失败则变成disabled，但我没试成功，反而加了这句话非submit按钮也会提交到action指定页面               
                message: '通用的验证失败消息', //好像从来没出现过               
                feedbackIcons: { //根据验证结果显示的各种图标                    
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    username: {
                        message: '用户名不合法',
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空'
                            },
                            stringLength: {
                                min: 3,
                                max: 30,
                                message: '请输入3到30个字符'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_\. \u4e00-\u9fa5 ]+$/,
                                message: '用户名只能由字母、数字、点、下划线和汉字组成 '
                            }
                        }
                    },
                    text: {
                        message: '输入不合法',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            },
                            stringLength: {
                                min: 1,
                                max: 100,
                                message: '请输入1到100个字符'
                            }
                        }
                    },

                    email: {
                        validators: {
                            notEmpty: {
                                message: 'email不能为空'
                            },
                            emailAddress: {
                                message: '请输入正确的邮件地址如：123@qq.com'
                            }
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '手机号不能为空'
                            },
                            regexp: {
                                regexp: "^([0-9]{11})?$",
                                message: '手机号码格式错误'
                            }
                        }
                    },
                    number: {
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            },
                            digits: {
                                message: '只能输出数字'
                            }
                        }
                    },
                    address: {
                        validators: {
                            notEmpty: {
                                message: '地址不能为空'
                            },
                            stringLength: {
                                min: 8,
                                max: 60,
                                message: '请输入5到60个字符'
                            }
                        }
                    },
                    select: {
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    }
                }
            });
            // $("#" + eventid).click(function () {
            //     var bv = form.data('bootstrapValidator');
            //     bv.validate();
            //     if (bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //         //alert("yes"); //验证成功后的操作，如ajax                }
            //         callback();
            //     }
            // })
        }

}